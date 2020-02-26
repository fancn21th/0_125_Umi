import xlsx, { utils } from 'xlsx';

export default (body, header, sheetName, fileName) => {
  const workBook = utils.book_new();
  const workSheet = utils.json_to_sheet(body, { header });
  utils.book_append_sheet(workBook, workSheet, sheetName);
  const result = xlsx.write(workBook, {
    bookType: 'xlsx',
    type: 'array',
  });
  const blob = new Blob([result], { type: 'application/octet-stream' });
  const link = document.createElement('a');
  const dateStr = new Date()
    .toLocaleDateString()
    .split('/')
    .map(val => (val.length <= 1 ? `0${val}` : val))
    .join('');
  fileName = `${fileName}-${dateStr}.xlsx`;
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  return Promise.resolve().then(() => {
    URL.revokeObjectURL(link.href);
    link.remove();
  });
};
