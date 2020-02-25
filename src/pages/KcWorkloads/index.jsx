import { Button, DatePicker, Select, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { getWorkloads } from './service';
import { columns } from '../../config/col-config-workloads';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Text } = Typography;

// 默认起止时间
const defaultDate = [
  moment()
    .startOf('day')
    .valueOf(),
  moment()
    .endOf('day')
    .valueOf(),
];

const TableList = () => {
  const [sorter, setSorter] = useState(defaultDate);
  const [type, setType] = useState('');
  const actionRef = useRef();

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="日工作量"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        params={{
          sorter,
          type,
        }}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary">导出表格</Button>,
          <Text>日期：</Text>,
          <RangePicker
            format="YYYY-MM-DD"
            defaultValue={[moment().startOf('day'), moment().endOf('day')]}
            onChange={date => {
              const dateArr = [date[0].valueOf(), date[1].valueOf()];
              setSorter(dateArr);
            }}
          />,
          <Text>类型：</Text>,
          <Select
            defaultValue=""
            onChange={val => {
              setType(val);
            }}
          >
            <Option value="" key="1">
              人员
            </Option>
            <Option value="1" key="2">
              叉车
            </Option>
          </Select>,
        ]}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
            已选择{' '}
            <a
              style={{
                fontWeight: 600,
              }}
            >
              {selectedRowKeys.length}
            </a>{' '}
            项&nbsp;&nbsp;
            <span>
              服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
            </span>
          </div>
        )}
        request={params => getWorkloads(params)}
        columns={columns}
        pagination={{
          showSizeChanger: true,
          pageSize: 10,
          current: 1,
        }}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
