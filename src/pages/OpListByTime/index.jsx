import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input, Typography, DatePicker } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { queryCargos } from './service';
import { columns } from '../../config/col-config-oplistbytime';
const { Search } = Input;
const { Text } = Typography;
const { RangePicker } = DatePicker;

// 测试用默认起止时间;
const defaultDate = [moment(1581436800000), moment(1581523199999)];

// 默认起止时间
// const defaultDate = [
//   moment()
//     .startOf('day')
//     .valueOf(),
//   moment()
//     .endOf('day')
//     .valueOf(),
// ];

const TableList = () => {
  const [sorter, setSorter] = useState({});
  const [date, setDate] = useState({
    begin: defaultDate[0].valueOf(),
    end: defaultDate[1].valueOf(),
  });
  const [tableparams, setTableparams] = useState({
    sorter,
    date,
  });

  const actionRef = useRef();

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="流水操作"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        onChange={(_, _filter, _sorter) => {
          setSorter(`${_sorter.field}_${_sorter.order}`);
        }}
        params={tableparams}
        toolBarRender={(action, { selectedRows }) => [
          <Button
            type="primary"
            onClick={() => {
              console.log(action);
            }}
          >
            导出表格
          </Button>,
          <Text>日期：</Text>,
          <RangePicker
            format="YYYY-MM-DD"
            defaultValue={defaultDate}
            onChange={dates => {
              if (dates && dates.length) {
                const date = { begin: dates[0].valueOf(), end: dates[1].valueOf() };
                setDate(date);
              }
            }}
          />,
          <Search
            placeholder="search..."
            onSearch={val => {
              setTableparams({
                ...tableparams,
                InOrderNo: val,
              });
            }}
            style={{ width: 200 }}
          />,
        ]}
        request={params => queryCargos(params)}
        columns={columns}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
