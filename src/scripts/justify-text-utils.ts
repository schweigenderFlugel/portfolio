import { PDFFont } from 'pdf-lib';

export const justifyText = (
  text: string, 
  font: PDFFont, 
  fontSize: number, 
  maxWidth: number
): string[] => {
  const words: string[] = text.split(' ');
  let lines: string[] = [];
  let currentLine: string = '';

  words.forEach(word => {
    const width = font.widthOfTextAtSize(currentLine + word + ' ', fontSize);
    if (width > maxWidth) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  });

  lines.push(currentLine.trim());

  return lines.map(line => {
    const wordsInLine = line.split(' ');
    if (wordsInLine.length === 1) {
      return line;
    }

    const lineWidth = font.widthOfTextAtSize(line, fontSize);
    const totalSpaces = wordsInLine.length - 1;
    const spaceWidth = (maxWidth - lineWidth) / totalSpaces;
    let justifiedLine = '';

    wordsInLine.forEach((word, index) => {
      justifiedLine += word;
      if (index < totalSpaces) {
        justifiedLine += ' '.repeat(Math.ceil(spaceWidth / font.widthOfTextAtSize(' ', fontSize)));
      }
    });

    return justifiedLine;
  });
};

