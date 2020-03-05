import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, DatePicker, Input, Typography, Select, Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { queryCargos } from './service';
import { columns } from '../../../config/col-config-reportworkloadsdev';
import data2ExcelJson from '../../../utils/excel/data2ExcelJson';
import exportJson2Sheet from '../../../utils/excel/exportJson2Sheet';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Text } = Typography;

const TableList = () => {
  const [datasource, setDatasource] = useState(null);
  const [mode, setMode] = useState('day');
  const [keywordsValue, setKeywordsValue] = useState('');
  const [keywords, setKeywords] = useState('');
  const [startTime, setStartTime] = useState(
    moment()
      .startOf(mode)
      .valueOf(),
  );
  const [endTime, setEndTime] = useState(
    moment()
      .endOf(mode)
      .valueOf(),
  );
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
      <Text>周期：</Text>
      <Select
        defaultValue="day"
        style={{ width: 120 }}
        onChange={val => {
          setKeywordsValue('');
          setKeywords('');
          setMode(val);
          setStartTime(
            moment()
              .startOf(val)
              .valueOf(),
          );
          setEndTime(
            moment()
              .endOf(val)
              .valueOf(),
          );
        }}
      >
        <Option value="day">日</Option>
        <Option value="month">月</Option>
        <Option value="year">年</Option>
      </Select>
      <Text>日期：</Text>
      <>
        {mode === 'day' ? (
          <RangePicker
            format="YYYY-MM-DD"
            defaultValue={[moment().startOf('day'), moment().endOf('day')]}
            onChange={date => {
              if (date && date.length) {
                setKeywordsValue('');
                setKeywords('');
                setStartTime(date[0].valueOf());
                setEndTime(date[1].valueOf());
              }
            }}
          />
        ) : null}
        {mode === 'month' ? (
          <RangePicker
            picker="month"
            format="YYYY-MM"
            defaultValue={[moment().startOf('month'), moment().endOf('month')]}
            onChange={date => {
              if (date && date.length) {
                setKeywordsValue('');
                setKeywords('');
                setStartTime(date[0].valueOf());
                setEndTime(date[1].valueOf());
              }
            }}
          />
        ) : null}
        {mode === 'year' ? (
          <RangePicker
            picker="year"
            format="YYYY"
            defaultValue={[moment().startOf('year'), moment().endOf('year')]}
            onChange={date => {
              if (date && date.length) {
                setKeywordsValue('');
                setKeywords('');
                setStartTime(date[0].valueOf());
                setEndTime(date[1].valueOf());
              }
            }}
          />
        ) : null}
      </>
      <Button
        type="primary"
        onClick={() => {
          const body = data2ExcelJson(datasource, columns);
          const headerOrder = [
            '设备ID',
            '收货任务数',
            '入库任务数',
            '移库任务数',
            '拣货任务数',
            '发运任务数',
            '总计',
          ];
          const sheetname = '叉车工作量';
          const filename = '叉车工作量';
          return exportJson2Sheet(body, headerOrder, sheetname, filename);
        }}
      >
        导出报表
      </Button>
    </div>
  );

  return (
    <PageHeaderWrapper title={false} content={headerContent}>
      <ProTable
        headerTitle={false}
        actionRef={actionRef}
        rowKey="key"
        search={false}
        options={{ fullScreen: false, reload: true, setting: true }}
        beforeSearchSubmit={params => {
          setKeywordsValue('');
          setKeywords('');
          return params;
        }}
        params={{ mode, startTime, endTime, keywords }}
        toolBarRender={(action, { selectedRows }) => [
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
        request={async params => {
          const data = await queryCargos(params);
          const { data: datasource } = data;
          await setDatasource(datasource);
          return data;
        }}
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
