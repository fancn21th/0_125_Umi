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
  const dateStr = new Date()
    .toLocaleDateString()
    .split('/')
    .map(val => (val.length <= 1 ? `0${val}` : val))
    .join('');
  fileName = `${fileName}-${dateStr}.xlsx`;
  //for IE11
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, fileName);
    return true;
  } else {
    //for Non-IE(chrome, firefox etc.)
    const link = document.createElement('a');
    document.documentElement.appendChild(link);
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    return Promise.resolve().then(() => {
      URL.revokeObjectURL(link.href);
      document.documentElement.removeChild(link);
    });
  }
};
