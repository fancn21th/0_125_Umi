import moment from 'moment';
const notRequiredIndex = ['SpeRemark', 'MSDS', 'CargoGroupID', 'OwnerCode', 'key', 'Isbro'];
const header = [
  '入库单号',
  '货物RFID',
  '货位号',
  '物料行数',
  '行号',
  '物料号',
  '物料名',
  '批次号',
  '应收',
  '实收',
  '包装',
  '危险等级',
  '货物状态',
  '盘点状态',
  '盘点时间',
];

export default (data, colums) => {
  const configMap = colums.reduce((acc, val) => {
    const { dataIndex } = val;
    return {
      ...acc,
      [dataIndex]: {
        ...val,
      },
    };
  }, {});
  const excelJson = data.map(obj => {
    return Object.keys(obj)
      .filter(key => !notRequiredIndex.includes(key))
      .reduce((acc, key) => {
        const { title, valueEnum, valueType } = configMap[key];
        let value = obj[key];
        if (valueType === 'dateTime') {
          value = moment(value).format('YYYY-MM-DD HH:mm:ss');
        }
        if (valueEnum !== undefined) {
          value = valueEnum[value].text;
        }
        return {
          ...acc,
          [title]: value,
        };
      }, {});
  });
  return {
    body: [...excelJson],
    header,
  };
};
