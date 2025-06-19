const express = require('express');
const { print } = require('pdf-to-printer');
const path = require('path');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const tickets = require('../data/tickets.json');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');

const app = express();
const PORT = 3002;

app.use(express.static('public'));

app.use(bodyParser.json());

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const getTicketType = (type) => {
  switch (type) {
      case 'speaker':
        return {
          text: 'SPEAKER',
          color: '#FF5500'
        }
      case 'investor':
        return {
          text: 'INVESTOR', 
          color: '#2E5894'
        }
      case 'startup':
        return {
          text: 'STARTUP',
          color: '#1B998B'
        }
      case 'regular':
        return {
          text: 'STUDENT',
          color: '#4A4A4A' 
        }
      case 'founder':
        return {
          text: 'FOUNDER',
          color: '#FF8C42'
        }
      case 'staff':
        return {
          text: 'STAFF',
          color: '#2D3047'
        }
      default:
        return {
          text: 'REGULAR',
          color: '#4A4A4A' 
        }
    }
}

app.post('/api/print', async (req, res) => {
  // const { data: { scan: { ticketId }} } = await req.body;
  const ticketId = '6828848d201210c5561b7a0e'
  const currentBadge = tickets.find((badge) => badge.id === ticketId);
  const ticketType = getTicketType();

  const doc = new PDFDocument({
    size: [273, 380],
    margin: 0
  });

  doc.pipe(fs.createWriteStream('assets/badge.pdf'));

  // Logo
  doc.image('assets/startup-contacts.png', 61, 20, { width: 150 });

  // Name
  doc.fontSize(28)
     .text(currentBadge.firstname, 0, 120, { align: 'center' })
     .text(currentBadge.lastname, 0, 150, { align: 'center' });

  // Affiliation
  doc.font('Helvetica')
     .fontSize(20)
     .fillColor('black')
     .text('WWU MÜNSTER', 0, 200, { align: 'center' });

  // QR Code
  doc.image(await QRCode.toDataURL(`https://linkedin.com/in/${currentBadge['extraFields.linkedin']}`), 101, 240, { width: 70, align: 'center' });

  // Role Banner
  doc.rect(0, 330, 273, 30)
     .fill(ticketType.color);
  doc.font('Helvetica')
     .fontSize(20)
     .fillColor('white')
     .text(ticketType.text, 0, 337, { align: 'center' });

  doc.end();

  await sleep(1000);

  const filePath = path.join(__dirname, 'assets', 'badge.pdf');

  try {
    await print(filePath);
    console.log('File sent to printer.');
    return res.sendStatus(200);
  } catch (err) {
    console.error('Print error:', err);
    return res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
}); 