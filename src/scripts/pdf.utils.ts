import { PDFDocument, rgb } from 'pdf-lib';

export async function generatePdf() {

  console.log('You should see this message when you click this button')

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const { width, height } = page.getSize();
  const fontSize = 30;

  // Agregar texto al PDF
  page.drawText('Hello, world!', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    color: rgb(0, 0.53, 0.71),
  });

  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  console.log(url)

  return url;
}