import { Button, Dropdown, Menu, DatePicker, Select, Typography, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { getWorkloads } from './service';
import { columns } from '../../config/col-config-workloads';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Text } = Typography;
const { Search } = Input;

// 默认起止时间
const defaultDate = [
  moment()
    .startOf('year')
    .valueOf(),
  moment()
    .endOf('year')
    .valueOf(),
];

const TableList = () => {
  const [sorter, setSorter] = useState(defaultDate);
  const [keywordsValue, setKeywordsValue] = useState('');
  const [keywords, setKeywords] = useState('');
  const [type, setType] = useState('');
  const actionRef = useRef();

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="年工作量"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        beforeSearchSubmit={params => {
          setKeywordsValue('');
          setKeywords('');
          return params;
        }}
        params={{
          sorter,
          type,
          keywords,
        }}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary">导出表格</Button>,
          <Text>日期：</Text>,
          <RangePicker
            format="YYYY"
            defaultValue={[moment().startOf('year'), moment().endOf('year')]}
            onChange={date => {
              const dateArr = [date[0].valueOf(), date[1].valueOf()];
              setKeywordsValue('');
              setKeywords('');
              setSorter(dateArr);
            }}
          />,
          <Text>类型：</Text>,
          <Select
            defaultValue=""
            onChange={val => {
              setKeywordsValue('');
              setKeywords('');
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
          <Search
            placeholder="搜索..."
            onSearch={val => {
              setKeywords(val);
            }}
            onChange={e => {
              setKeywordsValue(e.target.value);
            }}
            value={keywordsValue}
            style={{ width: 200 }}
          />,
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
