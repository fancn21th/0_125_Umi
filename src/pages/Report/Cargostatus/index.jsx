import { Button, Divider, Dropdown, DatePicker, message, Input, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { queryRecipients } from '@/services/recipients';
import { queryEmailSetting, updateEmailSetting } from '@/services/emailConfig';
import { queryCargos, sendmail } from './service';
import { columns } from '../../../config/col-config-reportcargostatus';
import data2ExcelJson from '../../../utils/excel/data2ExcelJson';
import exportJson2Sheet from '../../../utils/excel/exportJson2Sheet';
import MailConfigForm from '../components/MailConfigForm';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Text } = Typography;

const TableList = () => {
  const [emailConfigModalVisible, setEmailModalConfigVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [mailConfig, setMailConfig] = useState(null);
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
    const hide = message.loading('正在加载邮件配置');

    try {
      const { data: recipientsRes } = await queryRecipients();
      setRecipients(recipientsRes);
      const emailSettingRes = await queryEmailSetting({
        category: 'status',
        mode: 'day',
      });
      setMailConfig(emailSettingRes);
      setEmailModalConfigVisible(true);
      hide();
      return true;
    } catch (error) {
      hide();
      message.error('获取常用联系人失败');
      return false;
    }
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

      setEmailModalConfigVisible(false);
      return true;
    } catch (error) {
      hide();
      message.error('邮件配置更新失败,请重试');
      return false;
    }
  };

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="货物状态信息报表"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        params={tableparams}
        toolBarRender={(action, { selectedRows }) => [
          <Text>选择日期：</Text>,
          <RangePicker
            format="YYYY-MM-DD"
            defaultValue={[moment().startOf('day'), moment().endOf('day')]}
            onChange={date => {
              if (date && date.length) {
                setTableparams({
                  ...tableparams,
                  startTime: date[0].valueOf(),
                  endTime: date[1].valueOf(),
                });
              }
            }}
          />,
          <Button type="primary" onClick={onEmailConfigClick}>
            配置邮件信息
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              const { dataSource } = action;
              const body = data2ExcelJson(dataSource, columns);
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
          </Button>,
          <Button
            type="default"
            onClick={async () => {
              const hide = message.loading('正在发送...');
              try {
                await sendmail({
                  startTime: tableparams.startTime,
                  endTime: tableparams.endTime,
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
        ]}
        request={params => queryCargos(params)}
        pagination={{
          showSizeChanger: true,
          pageSize: 10,
          current: 1,
        }}
        columns={columns}
      />
      <MailConfigForm
        mode="day"
        recipients={recipients}
        mailConfig={mailConfig}
        onSubmit={onUpdateMailConfig}
        onCancel={() => setEmailModalConfigVisible(false)}
        modalVisible={emailConfigModalVisible}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
