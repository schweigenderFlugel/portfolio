import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

interface IAcademic {
  title: string;
  start: number;
  finished: number | string;
  college: string;
}

export interface IResume {
  fullName: string;
  dni: number;
  cuil: number;
  country: string;
  state: string;
  address: string;
  phone: number;
  email: string;
  presentation: string;
  academic: IAcademic[];
  additional?: {
    languages: string[];
  }
  laboral?: string[];
}

export const generatePdf = async (resume: IResume): Promise<string> => {
  const data = [
    resume.fullName,
    resume.dni.toString(),
    resume.cuil.toString(),
    resume.country,
    resume.state,
    resume.address,
    resume.phone.toString(),
    resume.email,
  ]

  const properties = [
    'Nombre', 
    'DNI', 
    'CUIL', 
    'País', 
    'Provincia/Estado', 
    'Dirección', 
    'Teléfono', 
    'Correo'
  ]

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  const fontSize = 14;
  const marginY = 50;
  const marginX = 50;
  let yPosition = height - marginY - fontSize;

  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesRomanFontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  data.forEach((text, index) => {
    page.drawText(text, {
      x: marginX,
      y: yPosition,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= fontSize + 5;
  })
  

  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  return url;
}