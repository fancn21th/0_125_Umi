// import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, DatePicker, Input, Typography, Select } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { queryCargos, sendmail } from './service';
import { columns } from '../../../config/col-config-reportworkloads';
import data2ExcelJson from '../../../utils/excel/data2ExcelJson';
import exportJson2Sheet from '../../../utils/excel/exportJson2Sheet';
import MailConfigForm from '../components/MailConfigForm';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Text } = Typography;

const TableList = () => {
  const [emailConfigVisible, setEmailConfigVisible] = useState(false);
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

  const onEmailConfigClick = () => {
    setEmailConfigVisible(true);
  };

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle=""
        actionRef={actionRef}
        rowKey="key"
        search={false}
        beforeSearchSubmit={params => {
          setKeywordsValue('');
          setKeywords('');
          return params;
        }}
        params={{ mode, startTime, endTime, keywords }}
        toolBarRender={(action, { selectedRows }) => [
          <Text>周期：</Text>,
          <Select
            defaultValue="day"
            style={{ width: 120 }}
            onChange={val => {
              setMode(val);
              setKeywordsValue('');
              setKeywords('');
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
          </Select>,
          <Text>日期：</Text>,
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
          </>,
          <Button type="primary" onClick={onEmailConfigClick}>
            配置邮件信息
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              const { dataSource } = action;
              const body = data2ExcelJson(dataSource, columns);
              const headerOrder = [
                '员工',
                '日期',
                '收货任务数',
                '入库任务数',
                '拣货任务数',
                '移库任务数',
                '发运任务数',
              ];
              const sheetname = '人员工作量报表';
              const filename = '人员工作量报表';
              return exportJson2Sheet(body, headerOrder, sheetname, filename);
            }}
          >
            导出报表
          </Button>,
          <Button
            type="default"
            onClick={async () => {
              const hide = message.loading('正在发送...');
              try {
                await sendmail({
                  mode,
                  startTime,
                  endTime,
                });
                hide();
                message.success('发送成功');
              } catch (error) {
                hide();
                message.error(`发送失败,原因：${error.message}`);
              }
            }}
          >
            手动发送
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
        ]}
        request={params => queryCargos(params)}
        columns={columns}
        pagination={{
          showSizeChanger: true,
          pageSize: 10,
          current: 1,
        }}
      />
      <MailConfigForm
        onSubmit={value => {
          console.table(value);
          setEmailConfigVisible(false);
        }}
        onCancel={() => setEmailConfigVisible(false)}
        modalVisible={emailConfigVisible}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
