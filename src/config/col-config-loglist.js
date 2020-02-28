export const columns = [
  {
    title: '操作',
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
    title: '上传消息',
    dataIndex: 'Param',
    sorter: false,
  },
  {
    title: '反馈消息',
    dataIndex: 'Result',
    sorter: false,
  },
  {
    title: '成功标志',
    dataIndex: 'Flag',
    sorter: false,
  },
  {
    title: '上传时间',
    dataIndex: 'StartTime',
    valueType: 'dateTime',
    sorter: false,
  },
  {
    title: '反馈时间',
    dataIndex: 'ResultTime',
    valueType: 'dateTime',
    sorter: false,
  },
];
