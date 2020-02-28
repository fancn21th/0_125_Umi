export const columns = [
  {
    title: '操作类型',
    dataIndex: 'OpType',
    sorter: false,
    filters: false,
    hideInSearch: true,
    valueEnum: {
      receipt: {
        text: '收货',
      },
      receive: {
        text: '缓存',
      },
      shelve: {
        text: '上架',
      },
      move: {
        text: '移库',
      },
      pick: {
        text: '拣货',
      },
      ship: {
        text: '发运',
      },
    },
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
    hideInSearch: true,
  },
  {
    title: '物料名',
    dataIndex: 'CargoName',
    sorter: false,
    hideInSearch: true,
  },
  {
    title: '件数',
    dataIndex: 'Quantity',
    sorter: false,
    hideInSearch: true,
  },
  {
    title: '原货位',
    dataIndex: 'ShelfGroupNo',
    sorter: false,
    hideInSearch: true,
  },
  {
    title: '推荐货位',
    dataIndex: 'NewShelfGroupNo',
    sorter: false,
    hideInSearch: true,
  },
  {
    title: '新货位',
    dataIndex: 'DestShelfGroupNo',
    sorter: false,
    hideInSearch: true,
  },
  {
    title: '作业人员',
    dataIndex: 'OpStaff',
    sorter: false,
    hideInSearch: true,
  },
  {
    title: '人员姓名',
    dataIndex: 'OpStaffName',
    sorter: false,
    hideInSearch: true,
  },
  {
    title: '作业设备',
    dataIndex: 'OpDev',
    sorter: false,
    hideInSearch: true,
  },
  {
    title: '作业状态',
    dataIndex: 'OpSta',
    filters: false,
    sorter: false,
    hideInSearch: true,
    valueEnum: {
      undo: {
        text: '未做',
      },
      doing: {
        text: '进行',
      },
      done: {
        text: '完成',
      },
    },
  },
  {
    title: '下发时间',
    dataIndex: 'OrderTimestamp',
    sorter: false,
    hideInSearch: true,
  },
  {
    title: '截止时间',
    dataIndex: 'DeadlineTimestamp',
    sorter: false,
    hideInSearch: true,
  },
  {
    title: '开始时间',
    dataIndex: 'BeginTimestamp',
    sorter: false,
    hideInSearch: true,
  },
  {
    title: '完成时间',
    dataIndex: 'EndTimestamp',
    sorter: false,
    hideInSearch: true,
  },
  {
    title: '同步状态',
    dataIndex: 'SyncStatus',
    filters: false,
    sorter: false,
    hideInSearch: true,
    valueEnum: {
      '0': {
        text: '未同步',
      },
      '1': {
        text: '已同步',
      },
    },
  },
];
