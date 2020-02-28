import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input, Typography, DatePicker } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { queryCargos } from './service';
import { columns } from '../../config/col-config-oplistbytime';
import momentToTimestamp from '../../utils/moment-to-timestamp';
import data2ExcelJson from '../../utils/excel/data2ExcelJson';
import exportJson2Sheet from '../../utils/excel/exportJson2Sheet';

const { Search } = Input;
const { Text } = Typography;
const { RangePicker } = DatePicker;

// 测试用默认起止时间;
const defaultDate = [moment(1581436800000), moment(1581523199999)];

// 默认起止时间
// const defaultDate = [moment().startOf('day'), moment().endOf('day')];

const TableList = () => {
  const [keywordsValue, setKeywordsValue] = useState('');
  const [keywords, setKeywords] = useState('');
  const [begin, setBegin] = useState(momentToTimestamp(defaultDate[0]));
  const [end, setEnd] = useState(momentToTimestamp(defaultDate[1]));

  const actionRef = useRef();

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="流水操作"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        options={{ fullScreen: false, reload: true, setting: true }}
        beforeSearchSubmit={params => {
          setKeywordsValue('');
          setKeywords('');
          return params;
        }}
        params={{ begin, end, keywords }}
        toolBarRender={(action, { selectedRows }) => [
          <Button
            type="primary"
            onClick={() => {
              const { dataSource } = action;
              const body = data2ExcelJson(dataSource, columns);
              const headerOrder = [
                '操作类型',
                '单号',
                '货物RFID',
                '物料名',
                '件数',
                '原货位',
                '推荐货位',
                '新货位',
                '作业人员',
                '人员姓名',
                '作业设备',
                '作业状态',
                '下发时间',
                '截止时间',
                '开始时间',
                '完成时间',
                '同步状态',
              ];
              const sheetname = '操作流水';
              const filename = '操作流水';
              return exportJson2Sheet(body, headerOrder, sheetname, filename);
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
                setBegin(momentToTimestamp(dates[0]));
                setEnd(momentToTimestamp(dates[1]));
              }
            }}
          />,
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
        request={params => queryCargos(params)}
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
