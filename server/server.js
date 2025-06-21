const express = require('express');
const { print } = require('pdf-to-printer');
const path = require('path');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const tickets = require('../data/tickets.json');
const customers = require('../data/customer.json');
const QRCode = require('qrcode');
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
const PORT = 3002;

app.use(express.static('public'));
app.use(bodyParser.json())
app.use(cors())

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const getTicketType = (badge) => {
  if (badge.ticketName === 'Student') {
    return {
      text: 'STUDENT',
      color: '#4A4A4A' 
    }
  } else if (badge.ticketName === 'Press') {
    return {
      text: 'PRESS',
      color: '#2E5894'
    }
  } else if (badge.ticketName === 'Speaker') {
    return {
      text: 'SPEAKER',
      color: '#FF5500'
    }
  } else if (badge.ticketName === 'Staff') {
    return {
      text: 'STAFF',
      color: '#2D3047'
    }
  } else if (badge.ticketName === 'Premium' || badge.ticketName === 'Regular') {
    return {
      text: badge['extraFields.spezifizierung_normales_ticket'] ?? '',
      color: badge.ticketName === 'Premium' ? '#FF8C42' : '#4A4A4A'
    }
  }
}

// Array of available printers
const printers = ['EPSON CW-C4000e', 'EPSON CW-C4000e (Kopie 1)', 'EPSON CW-C4000e (Kopie 2)'];

// Counter to track which printer to use next
let printerCounter = 0;

app.post('/api/print', async (req, res) => {
  const { data: { scan: { ticketId }} } = await req.body;
  const currentBadge = tickets.find((badge) => badge.id === ticketId);
  const ticketType = getTicketType(currentBadge);

  const doc = new PDFDocument({
    size: [273, 380],
    margin: 0
  });

  doc.pipe(fs.createWriteStream(`assets/badge-${currentBadge.id}.pdf`));

  // Logo
  doc.image('assets/startup-contacts.png', 61, 40, { width: 150 });

  // Name
  doc.fontSize(28)
     .text(currentBadge.firstname, 0, 120, { align: 'center' })
     .text(currentBadge.lastname, 0, 150, { align: 'center' });

  const customer = customers.find((customer) => customer.id === currentBadge.customerId);
  console.log(customer.company)
  // Affiliation
  doc.font('Helvetica')
     .fontSize(20)
     .fillColor('black')
     .text(customer.company === '' ? currentBadge['extraFields.an_welcher_uni_studierst_du'] : customer.company, 0, 200, { align: 'center' });

  // QR Code
  doc.image(await QRCode.toDataURL(`https://linkedin.com/in/${currentBadge['extraFields.linkedin']}`), 101, 240, { width: 70, align: 'center' });

  // Role Banner
  doc.rect(0, 330, 273, 30)
     .fill(ticketType.color);
  doc.font('Helvetica')
     .fontSize(20)
     .fillColor('white')
     .text(ticketType.text.toUpperCase(), 0, 337, { align: 'center' });

  doc.end();

  await sleep(2000);

  const filePath = path.join(__dirname, 'assets', `badge-${currentBadge.id}.pdf`);

    // Select the printer based on the counter
  const selectedPrinter = printers[printerCounter];

  try {
    await print(filePath, {
    printer: selectedPrinter,
    });
    console.log('File sent to printer.');

    // Increment the counter and wrap around if necessary
    printerCounter = (printerCounter + 1) % printers.length;

    return res.sendStatus(200);
  } catch (err) {
    console.error('Print error:', err);
    return res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
}); 