import { Button, Dropdown, Menu, DatePicker, Select,Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { getMonthWorkloads } from './service';
import { columns } from '../../config/col-config-workloads';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Text } = Typography;

const handleRemove = async selectedRows => {};

// 默认起止时间
const defaultDate = [
  moment()
    .startOf('month')
    .valueOf(),
  moment()
    .endOf('month')
    .valueOf(),
];

const TableList = () => {
  const [sorter, setSorter] = useState(defaultDate);
  const [type, setType] = useState('');
  const actionRef = useRef();

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="月工作量"
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
            format="YYYY-MM"
            defaultValue={[moment().startOf('month'), moment().endOf('month')]}
            onChange={date => {
              const dateArr = [date[0].valueOf(), date[1].valueOf()];
              setSorter(dateArr);
            }}
          />,
          <Text>类型：</Text>,
          <Select
            onChange={val => {
              setType(val);
            }}
            defaultValue=""
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
        request={params => getMonthWorkloads(params)}
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
