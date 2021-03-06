export const columns = [
  {
    title: '入库单号',
    dataIndex: 'InOrderNo',
    sorter: false,
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
    title: '同步状态',
    dataIndex: 'SyncStatus',
    sorter: false,
    hideInSearch: true,
    filters: false,
    valueEnum: {
      '0': {
        text: '未同步',
      },
      '1': {
        text: '已同步',
      },
    },
  },
  {
    title: '时间',
    dataIndex: 'Timestamp',
    sorter: false,
    valueType: 'dateTime',
    hideInSearch: true,
  },
];
