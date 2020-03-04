export const columns = [
  {
    title: '单号',
    dataIndex: 'OrderNo',
    sorter: false,
  },
  {
    title: '任务流水号',
    dataIndex: 'OpSn',
    sorter: false,
  },
  {
    title: '作业类型',
    dataIndex: 'OpType',
    filters: false,
    sorter: false,
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
    title: '作业人员',
    dataIndex: 'OpStaff',
    sorter: false,
  },
  {
    title: '作业人员名称',
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
    filters: false,
    sorter: false,
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
    title: '任务下拨时间',
    dataIndex: 'OrderTimestamp',
    sorter: false,
  },
  {
    title: '要求完成时间',
    dataIndex: 'DeadlineTimestamp',
    sorter: false,
  },
  {
    title: '任务开始时间',
    dataIndex: 'BeginTimestamp',
    sorter: false,
  },
  {
    title: '任务结束时间',
    dataIndex: 'EndTimestamp',
    sorter: false,
  },
  {
    title: '货物RFID标签',
    dataIndex: 'RFID',
    sorter: false,
  },
  {
    title: '起始货位',
    dataIndex: 'ShelfGroupNo',
    sorter: false,
  },
  {
    title: '目标货位',
    dataIndex: 'NewShelfGroupNo',
    sorter: false,
  },
  {
    title: '件数',
    dataIndex: 'Quantity',
    sorter: false,
  },
  {
    title: '物料名',
    dataIndex: 'CargoName',
    sorter: false,
  },
  {
    title: '同步状态',
    dataIndex: 'SyncStatus',
    filters: false,
    sorter: false,
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
