export const formatter = ({
  year,
  month,
  day,
  hour,
  minute,
  timeZoneName,
}: {
  year?: Intl.DateTimeFormatOptions['year'];
  month?: Intl.DateTimeFormatOptions['month'];
  day?: Intl.DateTimeFormatOptions['day'];
  hour?: Intl.DateTimeFormatOptions['hour'];
  minute?: Intl.DateTimeFormatOptions['minute'];
  timeZoneName?: Intl.DateTimeFormatOptions['timeZoneName'];
}) => new Intl.DateTimeFormat('es-ES', { year, month, day, hour, minute, timeZoneName });
