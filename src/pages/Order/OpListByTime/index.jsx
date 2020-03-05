import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input, Typography, DatePicker } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryCargos } from './service';
import { columns } from './config/col-config';
import data2ExcelJson from '@/utils/excel/data2ExcelJson';
import exportJson2Sheet from '@/utils/excel/exportJson2Sheet';
import config from './config/config';
import styles from './index.css';
const { tableTitle, headerTitle, defaultDate } = config;
const { Search } = Input;
const { Text } = Typography;
const { RangePicker } = DatePicker;

/**
 * Function(record, index):string
 * 通过OpSta判断背景色
 */

const getRowClass = (record, index) => {
  if (record.OpSta === 'undo') {
    return styles.undo;
  }
  if (record.OpSta === 'doing') {
    return styles.doing;
  }
  return '';
};

const TableList = () => {
  const [keywordsValue, setKeywordsValue] = useState('');
  const [keywords, setKeywords] = useState('');
  const [begin, setBegin] = useState(defaultDate[0].valueOf());
  const [end, setEnd] = useState(defaultDate[1].valueOf());

  const actionRef = useRef();

  const headerContent = (
    <div className="dc-headerContent-wrapper">
      <Text>日期：</Text>
      <RangePicker
        format="YYYY-MM-DD"
        defaultValue={defaultDate}
        onChange={dates => {
          if (dates && dates.length) {
            setBegin(dates[0].valueOf());
            setEnd(dates[1].valueOf());
          }
        }}
      />
    </div>
  );

  return (
    <PageHeaderWrapper title={headerTitle} content={headerContent}>
      <div className="dc-pageHeaderWrapper-fix-ahead-panel">
        <Button
          type="primary"
          onClick={async () => {
            const { data: dataSource } = await queryCargos({
              current: 1,
              pageSize: 100000,
              begin,
              end,
            });
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
        </Button>
      </div>
      <ProTable
        headerTitle={tableTitle}
        actionRef={actionRef}
        rowKey="key"
        search={false}
        rowClassName={getRowClass}
        options={{ fullScreen: false, reload: true, setting: true }}
        beforeSearchSubmit={params => {
          setKeywordsValue('');
          setKeywords('');
          return params;
        }}
        params={{ begin, end, keywords }}
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
        request={params => queryCargos(params)}
        columns={columns}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 10,
          defaultCurrent: 1,
        }}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;