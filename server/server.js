const express = require('express');
const { print } = require('pdf-to-printer');
const path = require('path');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const tickets = require('../data/tickets.json');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3002;

app.use(express.static('public'));

app.use(bodyParser.json());

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
} 

app.get('/api/print', async (req, res) => {
  // const { data: { scan: { ticketId }} } = await req.body;
  const ticketId = '6828848d201210c5561b7a03'
  const currentBadge = tickets.find((badge) => badge.id === ticketId);

  const doc = new PDFDocument({
    size: [273, 380],
    margin: 0
  });

  doc.pipe(fs.createWriteStream('assets/badge.pdf'));

  // 1. Logo
  doc.image('assets/startup-contacts.png', 100, 40, { width: 200 });

  // 3. Participant Name
  doc.fontSize(40)
     .text(currentBadge.name, 0, 200, { align: 'center' })
     .fontSize(30)
     .text(currentBadge.lastname, { align: 'center' });

  // 4. Affiliation
  doc.font('Helvetica')
     .fontSize(24)
     .fillColor('black')
     .text('WWU MÜNSTER', 0, 300, { align: 'center' });

  // 5. QR Code
  doc.image('assets/qrcode.png', 100, 350, { width: 200, align: 'center' });

  // 6. Role Banner
  doc.rect(0, 650, 400, 50)
     .fill('#FF5500');
  doc.font('Helvetica')
     .fontSize(32)
     .fillColor('white')
     .text('SPEAKER', 0, 660, { align: 'center' });

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