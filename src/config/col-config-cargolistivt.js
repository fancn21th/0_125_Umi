export const columns = [
  {
    title: '入库单号',
    dataIndex: 'InOrderNo',
    sorter: false,
    hideInSearch: true,
  },
  {
    title: '货物RFID',
    dataIndex: 'RFID',
    sorter: false,
    hideInSearch: true,
  },
  {
    title: '货位号',
    dataIndex: 'ShelfGroup',
    sorter: false,
    hideInSearch: true,
  },
  {
    title: '物料行数',
    dataIndex: 'lineLen',
    sorter: false,
    hideInSearch: true,
  },
  {
    title: '货物状态',
    dataIndex: 'CargoStatus',
    sorter: false,
    hideInSearch: true,
    filters: false,
    valueEnum: {
      '0': {
        text: '待收货',
      },
      '1': {
        text: '已收货',
      },
      '2': {
        text: '待上架',
      },
      '3': {
        text: '已缓存',
      },
      '4': {
        text: '已上架',
      },
      '5': {
        text: '待移库',
      },
      '6': {
        text: '待拣货',
      },
      '7': {
        text: '已拣货',
      },
      '8': {
        text: '待发运',
      },
      '9': {
        text: '已发运',
      },
    },
  },
  {
    title: '盘点状态',
    dataIndex: 'IvtStatus',
    sorter: false,
    filters: false,
    hideInSearch: true,
    valueEnum: {
      '0': {
        text: '在库',
      },
      '1': {
        text: '盘盈',
      },
      '2': {
        text: '盘亏',
      },
    },
  },
  {
    title: '盘点时间',
    dataIndex: 'Timestamp',
    sorter: false,
    hideInSearch: true,
    filters: false,
    valueType: 'dateTime',
  },
];
