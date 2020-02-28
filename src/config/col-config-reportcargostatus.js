export const columns = [
  {
    title: '单号',
    dataIndex: 'orderNo',
    sorter: false,
  },
  {
    title: '任务流水号',
    dataIndex: 'opSn',
    sorter: false,
  },
  {
    title: '作业类型',
    dataIndex: 'opType',
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
    dataIndex: 'opStaff',
    sorter: false,
  },
  {
    title: '作业人员名称',
    dataIndex: 'opStaffName',
    sorter: false,
  },
  {
    title: '作业设备',
    dataIndex: 'opDev',
    sorter: false,
  },
  {
    title: '作业状态',
    dataIndex: 'opSta',
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
    dataIndex: 'orderTimestamp',
    sorter: false,
    valueType: 'dateTime',
  },
  {
    title: '要求完成时间',
    dataIndex: 'deadlineTimestamp',
    sorter: false,
    valueType: 'dateTime',
  },
  {
    title: '任务开始时间',
    dataIndex: 'beginTimestamp',
    sorter: false,
    valueType: 'dateTime',
  },
  {
    title: '任务结束时间',
    dataIndex: 'endTimestamp',
    sorter: false,
    valueType: 'dateTime',
  },
  {
    title: '货物RFID标签',
    dataIndex: 'rfid',
    sorter: false,
  },
  {
    title: '起始货位',
    dataIndex: 'shelfGroupNo',
    sorter: false,
  },
  {
    title: '目标货位',
    dataIndex: 'newShelfGroupNo',
    sorter: false,
  },
  {
    title: '件数',
    dataIndex: 'quantity',
    sorter: false,
  },
  {
    title: '物料名',
    dataIndex: 'cargoName',
    sorter: false,
  },
  {
    title: '同步状态',
    dataIndex: 'syncStatus',
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
