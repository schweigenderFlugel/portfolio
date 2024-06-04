import { PDFDocument, StandardFonts, drawEllipse, rgb } from 'pdf-lib';
import { justifyText } from './justify-text-utils';

interface IAcademic {
  title: string;
  start: number;
  finished: number | string;
  college: string;
}

export interface IResume {
  fullName: string;
  image: string;
  dni: number;
  cuil: number;
  country: string;
  state: string;
  address: string;
  phone: number;
  email: string;
  age: number;
  presentation: string;
  academic: IAcademic[];
  additional?: {
    languages: string[];
    informatic: string[];
  }
  laboral?: string[];
}

export const generatePdf = async (resume: IResume): Promise<string> => {
  const data = [
    `Teléfono: ${resume.phone.toString()}`,
    `Email: ${resume.email}`,
    `DNI: ${resume.dni.toString()}`,
    `CUIL: ${resume.cuil.toString()}`,
    `Dirección: ${resume.address}`,
    `Provincia: ${resume.state}`,
    `Nacionalidad: ${resume.country}`,
    `Edad: ${resume.age.toString()}`,
  ]

  const jpgImageBytes = await fetch(resume.image).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.create();
  
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  const leftMargin = 50;
  const topMargin = 50;

  const contentWidth = width - leftMargin;
  let textX = leftMargin;
  let textY = height - topMargin;
  let lineSpacing: number;

  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesRomanFontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const profileImage = await pdfDoc.embedJpg(jpgImageBytes);

  const profileImageDims = profileImage.scaleToFit(100, 100);

  page.drawText(resume.fullName, {
    x: textX,
    y: textY,
    size: 14,
    font: timesRomanFontBold,
    color: rgb(0, 0, 0),
    maxWidth: contentWidth,
  });

  page.drawImage(profileImage, {
    x: textX + 400,
    y: textY - 80,
    width: profileImageDims.width,
    height: profileImageDims.height,
  })

  textY -= 14 + 8;

  data.forEach(item => {
    page.drawText(item, {
      x: textX,
      y: textY,
      size: 11,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
      maxWidth: contentWidth,
    });
    textY -= 10 + 6;
  })

  textY -= 10 + 4;

  page.drawText('Presentación: ', {
    x: textX,
    y: textY,
    size: 14,
    font: timesRomanFontBold,
    color: rgb(0, 0, 0),
    maxWidth: contentWidth,
  });

  textY -= 14 + 8;

  const presentationText = justifyText(resume.presentation, timesRomanFont, 14, contentWidth + 50);
  
  lineSpacing = textY;
  presentationText.forEach(line => {
    page.drawText(line, {
      x: textX,
      y: lineSpacing,
      size: 11,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
    lineSpacing -= 14 + 2; 
  });

  textY = lineSpacing - 20;

  page.drawText('Formación académica: ', {
    x: textX,
    y: textY,
    size: 14,
    font: timesRomanFontBold,
    color: rgb(0, 0, 0),
    maxWidth: contentWidth,
  });

  textY -= 14 + 8;

  resume.academic.forEach(item => {
    const text = `${item.title} ${item.start}-${item.finished} (${item.college})`
    page.drawText(text, {
      x: textX + 20,
      y: textY,
      size: 11,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
      maxWidth: contentWidth,
    })
    textY -= 10 + 8;
  })

  textY -= 12;

  page.drawText('Formación adicional: ', {
    x: textX,
    y: textY,
    size: 14,
    font: timesRomanFontBold,
    color: rgb(0, 0, 0),
  });

  textY -= 14 + 4;

  page.drawText('- Idiomas: ', {
    x: textX + 20,
    y: textY,
    size: 12,
    font: timesRomanFontBold,
    color: rgb(0, 0, 0),
  });

  textY -= 12 + 6;

  resume.additional?.languages.forEach(item => {
    page.drawText(item, {
      x: textX + 40,
      y: textY,
      size: 11,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
      maxWidth: contentWidth,
    })
    textY -= 10 + 8;
  }) 

  textY -= 12;

  page.drawText('- Informática y programación: ', {
    x: textX + 20,
    y: textY,
    size: 12,
    font: timesRomanFontBold,
    color: rgb(0, 0, 0),
  });

  textY -= 12 + 6;

  page.drawText(resume.additional?.informatic[0] as string, {
    x: textX + 40,
    y: textY,
    size: 11,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
    maxWidth: contentWidth,
  })
  textY -= 10 + 8;

  const informatic = justifyText(
    resume.additional?.informatic[1] as string, 
    timesRomanFont, 
    14, 
    contentWidth - 100
  );

  lineSpacing = textY;
  informatic.forEach(line => {
    page.drawText(line, {
      x: textX + 40,
      y: lineSpacing,
      size: 11,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
    lineSpacing -= 14 + 2; 
  });
  
  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  return url;
}