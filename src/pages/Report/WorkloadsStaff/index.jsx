// import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, DatePicker, Input, Typography, Select } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { queryEmailSetting, updateEmailSetting } from '@/services/emailConfig';
import data2ExcelJson from '@/utils/excel/data2ExcelJson';
import exportJson2Sheet from '@/utils/excel/exportJson2Sheet';
import { queryCargos, sendmail } from './service';
import { columns } from './config/col-config';
import config from './config/config';
import MailConfigForm from '../components/MailConfigForm';
import { useRecipients } from '../hooks/useRecipients';

const { tableTitle, headerTitle, dayDefaultDate, monthDefaultDate, yearDefaultDate } = config;
const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Text } = Typography;

const TableList = () => {
  const [emailConfigModalVisible, setEmailModalConfigVisible] = useState(false);
  const [mailConfig, setMailConfig] = useState({});
  const [mode, setMode] = useState('day');
  const { recipients } = useRecipients([]);
  const [datasource, setDatasource] = useState(null);
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

  // 点击邮件配置按钮回调
  const onEmailConfigClick = async () => {
    const hide = message.loading('正在加载邮件配置');

    if (recipients.length === 0) {
      message.error('请先设置常用联系人');
      return;
    }

    try {
      const emailSettingRes = await queryEmailSetting({
        category: 'human',
        mode,
      });
      await setMailConfig(emailSettingRes);
      setEmailModalConfigVisible(true);
      hide();
    } catch (error) {
      hide();
      message.error('获取常用联系人失败');
    }
  };

  // 更新邮件配置回调
  const onUpdateMailConfig = async data => {
    const hide = message.loading('正在更新');
    try {
      await updateEmailSetting({
        category: 'human',
        mode,
        data,
      });
      hide();
      message.success('邮件配置更新成功');
      await setEmailModalConfigVisible(false);
      setMailConfig({});
    } catch (error) {
      hide();
      message.error('邮件配置更新失败,请重试');
    }
  };

  // 更新邮件配置取消
  const onCancelMailConfig = async () => {
    await setEmailModalConfigVisible(false);
    await setMailConfig({});
  };

  // 日月年切换
  const onSelectionChange = val => {
    setMode(val);
    setKeywordsValue('');
    setKeywords('');
    // https://momentjs.com/docs/#/manipulating/start-of/
    setStartTime(
      moment()
        .startOf(val)
        .valueOf(),
    );
    // https://momentjs.com/docs/#/manipulating/end-of/
    setEndTime(
      moment()
        .endOf(val)
        .valueOf(),
    );
  };

  const headerContent = (
    <div className="dc-headerContent-wrapper">
      <Text>周期：</Text>
      <Select defaultValue="day" style={{ width: 120 }} onChange={onSelectionChange}>
        <Option value="day">日</Option>
        <Option value="month">月</Option>
        <Option value="year">年</Option>
      </Select>
      <Text>日期：</Text>
      <>
        {mode === 'day' ? (
          <RangePicker
            format="YYYY-MM-DD"
            defaultValue={dayDefaultDate}
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
            defaultValue={monthDefaultDate}
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
            defaultValue={yearDefaultDate}
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
      <Button type="primary" onClick={onEmailConfigClick}>
        配置邮件信息
      </Button>
      <Button
        type="default"
        onClick={async () => {
          const hide = message.loading('正在发送...');
          const res = await sendmail({
            mode,
            startTime,
            endTime,
          });
          hide();
          if (res) {
            message.error('发送失败');
          } else {
            message.success('发送成功');
          }
        }}
      >
        手动发送
      </Button>
    </div>
  );

  return (
    <PageHeaderWrapper title={headerTitle} content={headerContent}>
      <div className="dc-pageHeaderWrapper-fix-ahead-panel">
        <Button
          type="primary"
          onClick={() => {
            const body = data2ExcelJson(datasource, columns);
            const headerOrder = [
              '人员',
              '日期',
              '收货任务数',
              '入库任务数',
              '拣货任务数',
              '移库任务数',
              '发运任务数',
              '总计',
            ];
            const sheetname = '人员工作量报表';
            const filename = '人员工作量报表';
            return exportJson2Sheet(body, headerOrder, sheetname, filename);
          }}
        >
          导出报表
        </Button>
      </div>
      <ProTable
        headerTitle={tableTitle}
        actionRef={actionRef}
        rowKey="key"
        options={{ fullScreen: false, reload: true, setting: true }}
        search={false}
        beforeSearchSubmit={params => {
          setKeywordsValue('');
          setKeywords('');
          return params;
        }}
        params={{ mode, startTime, endTime, keywords }}
        toolBarRender={() => [
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
          const { data: datasource2 } = data;
          await setDatasource(datasource2);
          return data;
        }}
        columns={columns}
        pagination={{
          showSizeChanger: true,
          pageSize: 10,
          current: 1,
        }}
      />
      {recipients.length && mailConfig && Object.keys(mailConfig).length ? (
        <MailConfigForm
          mode={mode}
          recipients={recipients}
          mailConfig={mailConfig}
          onSubmit={onUpdateMailConfig}
          onCancel={onCancelMailConfig}
          modalVisible={emailConfigModalVisible}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
