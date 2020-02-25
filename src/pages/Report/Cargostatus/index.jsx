import { Button, Divider, Dropdown, DatePicker, message, Input, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { queryCargos, sendmail } from './service';
import { columns } from '../../../config/col-config-reportcargobroken';
const { Search } = Input;
const { RangePicker } = DatePicker;
const { Text } = Typography;

const TableList = () => {
  const [searchText, setSearchText] = useState('');
  const [tableparams, setTableparams] = useState({
    startTime: moment()
      .startOf('day')
      .valueOf(),
    endTime: moment()
      .endOf('day')
      .valueOf(),
  });

  const actionRef = useRef();

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
          <Button type="primary">配置邮件信息</Button>,
          <Button type="primary">导出报表</Button>,
          <Button
            type="default"
            onClick={async () => {
              const hide = message.loading('正在发送...');
              try {
                await sendmail({
                  startTime: tableparams['startTime'],
                  endTime: tableparams['endTime'],
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
    </PageHeaderWrapper>
  );
};

export default TableList;
