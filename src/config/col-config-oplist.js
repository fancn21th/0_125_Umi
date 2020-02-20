export const columns = [
  {
    title: '操作类型',
    dataIndex: 'OpType',
    sorter: false,
    valueEnum: {
      'receipt': {
        text: '收货',
      },
      'receive': {
        text: '缓存',
      },
      'shelve': {
        text: '上架',
      },
      'move': {
        text: '移库',
      },
      'pick': {
        text: '拣货',
      },
      'ship': {
        text: '发运',
      },
    }
  },
  {
    title: '单号',
    dataIndex: 'OrderNo',
    sorter: false,
  },
  {
    title: '货物RFID',
    dataIndex: 'RFID',
    sorter: false,
  },
  {
    title: '物料名',
    dataIndex: 'CargoName',
    sorter: false,
  },
  {
    title: '件数',
    dataIndex: 'Quantity',
    sorter: false,
  },
  {
    title: '原货位',
    dataIndex: 'ShelfGroupNo',
    sorter: false,
  },
  {
    title: '推荐货位',
    dataIndex: 'NewShelfGroupNo',
    sorter: false,
  },
  {
    title: '新货位',
    dataIndex: 'DestShelfGroupNo',
    sorter: false,
  },
  {
    title: '作业人员',
    dataIndex: 'OpStaff',
    sorter: false,
  },
  {
    title: '人员姓名',
    dataIndex: 'OpStaffName',
    sorter: false,
  },
  {
    title: '作业设备',
    dataIndex: 'OpDev',
    sorter: false,
  },
  {
    title: '作业状态',
    dataIndex: 'OpSta',
    sorter: false,
  },
  {
    title: '下发时间',
    dataIndex: 'OrderTimestamp',
    sorter: false,
    valueType: 'dateTime',
  },
  {
    title: '截止时间',
    dataIndex: 'DeadlineTimestamp',
    sorter: false,
    valueType: 'dateTime',
  },
  {
    title: '开始时间',
    dataIndex: 'BeginTimestamp',
    sorter: false,
    valueType: 'dateTime',
  },
  {
    title: '完成时间',
    dataIndex: 'EndTimestamp',
    sorter: false,
    valueType: 'dateTime',
  },
  {
    title: '同步状态',
    dataIndex: 'SyncStatus',
    sorter: false,
    valueEnum: {
      '0': {
        text: '未同步',
      },
      '1': {
        text: '已同步',
      },
      '2': {
        text: '回滚',
      },
    },
  },
];
