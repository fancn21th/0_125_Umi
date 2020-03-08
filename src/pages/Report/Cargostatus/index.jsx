import { Button, DatePicker, message, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { updateEmailSetting } from '@/services/emailConfig';
import data2ExcelJson from '@/utils/excel/data2ExcelJson';
import exportJson2Sheet from '@/utils/excel/exportJson2Sheet';
import { queryCargos, sendmail } from './service';
import { columns } from './config/col-config';
import config from './config/config';
import MailConfigForm from '../components/MailConfigForm';
import { useEmailConfig } from '../hooks/useEmailConfig';
import { useRecipients } from '../hooks/useRecipients';

const { tableTitle, headerTitle, defaultDate } = config;
const { RangePicker } = DatePicker;
const { Text } = Typography;

const TableList = () => {
  const [emailConfigModalVisible, setEmailModalConfigVisible] = useState(false);
  const { emailConfig, reload, isEmailConfigReady } = useEmailConfig('status');
  const { recipients } = useRecipients([]);
  const [datasource, setDatasource] = useState(null);
  const [tableparams, setTableparams] = useState({
    startTime: moment()
      .startOf('day')
      .valueOf(),
    endTime: moment()
      .endOf('day')
      .valueOf(),
  });

  const actionRef = useRef();

  // 点击邮件配置按钮回调
  const onEmailConfigClick = async () => {
    if (recipients.length === 0) {
      message.error('请先设置常用联系人');
      return;
    }
    setEmailModalConfigVisible(true);
  };

  // 更新邮件配置回调
  const onUpdateMailConfig = async data => {
    const hide = message.loading('正在更新');
    try {
      await updateEmailSetting({
        category: 'status',
        mode: 'day',
        data,
      });
      hide();
      message.success('邮件配置更新成功');
      await setEmailModalConfigVisible(false);
      await reload();
    } catch (error) {
      hide();
      message.error('邮件配置更新失败,请重试');
    }
  };

  // 更新邮件配置取消
  const onCancelMailConfig = async () => {
    await setEmailModalConfigVisible(false);
  };

  const headerContent = (
    <div className="dc-headerContent-wrapper">
      <Text>选择日期：</Text>
      <RangePicker
        format="YYYY-MM-DD"
        defaultValue={defaultDate}
        onChange={date => {
          if (date && date.length) {
            setTableparams({
              ...tableparams,
              startTime: date[0].valueOf(),
              endTime: date[1].valueOf(),
            });
          }
        }}
      />
      <Button type="primary" onClick={onEmailConfigClick}>
        配置邮件信息
      </Button>
      <Button
        type="default"
        onClick={async () => {
          const hide = message.loading('正在发送...');
          const res = await sendmail({
            startTime: tableparams.startTime,
            endTime: tableparams.endTime,
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
              '单号',
              '任务流水号',
              '作业类型',
              '作业人员',
              '作业人员名称',
              '作业设备',
              '作业状态',
              '任务下拨时间',
              '要求完成时间',
              '任务开始时间',
              '任务结束时间',
              '货物RFID标签',
              '起始货位',
              '目标货位',
              '件数',
              '物料名',
              '同步状态',
            ];
            const sheetname = '货物状态信息报表';
            const filename = '货物状态信息报表';
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
        search={false}
        options={{ fullScreen: false, reload: true, setting: true }}
        params={tableparams}
        request={async params => {
          const data = await queryCargos(params);
          const { data: datasource2 } = data;
          await setDatasource(datasource2);
          return data;
        }}
        pagination={{
          showSizeChanger: true,
          pageSize: 10,
          current: 1,
        }}
        columns={columns}
      />
      {isEmailConfigReady ? (
        <MailConfigForm
          mode="day"
          recipients={recipients}
          mailConfig={emailConfig}
          onSubmit={onUpdateMailConfig}
          onCancel={onCancelMailConfig}
          modalVisible={emailConfigModalVisible}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
