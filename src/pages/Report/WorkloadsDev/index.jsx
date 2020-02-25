import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, DatePicker, Input, Typography, Select } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { queryCargos, sendmail } from './service';
import { columns } from '../../../config/col-config-reportworkloadsdev';
const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Text } = Typography;

const TableList = () => {
  const [sorter, setSorter] = useState({});
  const [mode, setMode] = useState('day');
  const [tableparams, setTableparams] = useState({
    sorter,
    mode,
    startTime: moment()
      .startOf(mode)
      .valueOf(),
    endTime: moment()
      .endOf(mode)
      .valueOf(),
  });

  const actionRef = useRef();

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle=""
        actionRef={actionRef}
        rowKey="key"
        search={false}
        onChange={(_, _filter, _sorter) => {
          setSorter(`${_sorter.field}_${_sorter.order}`);
        }}
        params={tableparams}
        toolBarRender={(action, { selectedRows }) => [
          <Text>周期：</Text>,
          <Select
            defaultValue="day"
            style={{ width: 120 }}
            onChange={val => {
              setMode(val);
              setTableparams({
                ...tableparams,
                mode: val,
                startTime: moment()
                  .startOf(val)
                  .valueOf(),
                endTime: moment()
                  .endOf(val)
                  .valueOf(),
              });
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
                    setTableparams({
                      ...tableparams,
                      startTime: date[0].valueOf(),
                      endTime: date[1].valueOf(),
                    });
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
                    setTableparams({
                      ...tableparams,
                      startTime: date[0].valueOf(),
                      endTime: date[1].valueOf(),
                    });
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
                    setTableparams({
                      ...tableparams,
                      startTime: date[0].valueOf(),
                      endTime: date[1].valueOf(),
                    });
                  }
                }}
              />
            ) : null}
          </>,
          <Button type="primary">配置邮件信息</Button>,
          <Button type="primary">导出报表</Button>,
          <Button
            type="default"
            onClick={async () => {
              const hide = message.loading('正在发送...');
              try {
                await sendmail({
                  mode,
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
          <Search
            placeholder="搜索..."
            onSearch={val => {
              setTableparams({ InOrderNo: val });
            }}
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
