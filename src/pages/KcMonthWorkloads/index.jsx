import { Button, Dropdown, Menu, DatePicker, Select, Typography, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { getMonthWorkloads } from './service';
import { columns, columnsdev } from '../../config/col-config-workloads';
import data2ExcelJson from '../../utils/excel/data2ExcelJson';
import exportJson2Sheet from '../../utils/excel/exportJson2Sheet';
let localAction = null;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Text } = Typography;
const { Search } = Input;

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
  const [keywordsValue, setKeywordsValue] = useState('');
  const [keywords, setKeywords] = useState('');
  const [type, setType] = useState('');
  const actionRef = useRef();

  const headerContent = (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <Text>日期：</Text>
      <RangePicker
        picker="month"
        format="YYYY-MM"
        defaultValue={[moment().startOf('month'), moment().endOf('month')]}
        onChange={date => {
          const dateArr = [date[0].valueOf(), date[1].valueOf()];
          setKeywordsValue('');
          setKeywords('');
          localAction.resetPageIndex(1);
          setSorter(dateArr);
        }}
      />
      <Text>类型：</Text>
      <Select
        onChange={val => {
          setKeywordsValue('');
          setKeywords('');
          setType(val);
          localAction.resetPageIndex(1);
        }}
        defaultValue=""
      >
        <Option value="" key="1">
          人员
        </Option>
        <Option value="1" key="2">
          叉车
        </Option>
      </Select>
    </div>
  );
  if (type) {
    return (
      <PageHeaderWrapper title={false} content={headerContent}>
        <ProTable
          headerTitle={false}
          actionRef={actionRef}
          rowKey="id"
          search={false}
          options={{ fullScreen: false, reload: true, setting: true }}
          params={{
            sorter,
            type,
            keywords,
          }}
          beforeSearchSubmit={params => {
            setKeywordsValue('');
            setKeywords('');
            return params;
          }}
          toolBarRender={(action, { selectedRows }) => {
            localAction = action;
            return [
              <Button
                type="primary"
                onClick={() => {
                  const { dataSource } = action;
                  const body = data2ExcelJson(dataSource, columns);
                  const headerOrder = [
                    '人员/叉车',
                    '日期',
                    '收货任务数',
                    '入库任务数',
                    '拣货任务数',
                    '移库任务数',
                    '发运任务数',
                  ];
                  const sheetname = '月工作量';
                  const filename = '月工作量';
                  return exportJson2Sheet(body, headerOrder, sheetname, filename);
                }}
              >
                导出表格
              </Button>,
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
            ];
          }}
          request={params => getMonthWorkloads(params)}
          columns={columnsdev}
          pagination={{
            showSizeChanger: true,
            pageSize: 10,
            current: 1,
          }}
        />
      </PageHeaderWrapper>
    );
  } else {
    return (
      <PageHeaderWrapper title={false} content={headerContent}>
        <ProTable
          headerTitle={false}
          actionRef={actionRef}
          rowKey="id"
          search={false}
          options={{ fullScreen: false, reload: true, setting: true }}
          params={{
            sorter,
            type,
            keywords,
          }}
          beforeSearchSubmit={params => {
            setKeywordsValue('');
            setKeywords('');
            return params;
          }}
          toolBarRender={(action, { selectedRows }) => {
            localAction = action;
            return [
              <Button
                type="primary"
                onClick={() => {
                  const { dataSource } = action;
                  const body = data2ExcelJson(dataSource, columns);
                  const headerOrder = [
                    '人员/叉车',
                    '日期',
                    '收货任务数',
                    '入库任务数',
                    '拣货任务数',
                    '移库任务数',
                    '发运任务数',
                  ];
                  const sheetname = '月工作量';
                  const filename = '月工作量';
                  return exportJson2Sheet(body, headerOrder, sheetname, filename);
                }}
              >
                导出表格
              </Button>,
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
            ];
          }}
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
  }
};

export default TableList;
