import { Button, message, Input, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import LogModal from './components/LogModal';
import {
  queryOpList,
  queryUploadResultByInorder,
  queryUploadResult,
  updateStatus,
} from './service';
import { columns } from '../../config/col-config-oplist';
import { columns as logColumns } from '../../config/col-config-loglist';

const { Search } = Input;
const { Text } = Typography;

const validate = ono => {
  const reg = /^(IN|WV|OU)[_a-zA-Z0-9]+/g;
  return ono !== '' && reg.test(ono);
};

const TableList = () => {
  const [keywordsValue, setKeywordsValue] = useState('');
  const [keywords, setKeywords] = useState('');
  const [ordernoValue, setOrdernoValue] = useState('');
  const [orderno, setOrderno] = useState('');
  const [logData, setLogData] = useState({});
  const [logModalVisibility, setLogModalVisibility] = useState(false);
  const actionRef = useRef();

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="订单操作"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        options={{ fullScreen: false, reload: true, setting: true }}
        beforeSearchSubmit={params => {
          setKeywordsValue('');
          setKeywords('');
          return params;
        }}
        params={{ orderno, keywords }}
        toolBarRender={(action, { selectedRows }) => [
          <Text>单号：</Text>,
          <Input
            placeholder="请输入单号"
            value={ordernoValue}
            onChange={e => {
              setOrdernoValue(e.target.value);
            }}
          ></Input>,
          <Button
            type="primary"
            onClick={() => {
              if (validate(ordernoValue)) {
                setKeywordsValue('');
                setKeywords('');
                setOrderno(ordernoValue);
              } else {
                message.warning('请输入合规单号，示例前缀：IN、WV、OU');
              }
            }}
          >
            查询
          </Button>,
          <Button
            type="default"
            onClick={() => {
              setOrdernoValue('');
              setOrderno('');
              setKeywordsValue('');
              setKeywords('');
            }}
          >
            重置
          </Button>,
          <Button
            type="primary"
            onClick={async () => {
              if (validate(ordernoValue)) {
                const hide = message.loading('正在查询...');
                try {
                  const data = await queryUploadResultByInorder(ordernoValue);
                  hide();
                  message.success('查询成功');
                  await setLogData(data);
                  return setLogModalVisibility(true);
                } catch (error) {
                  hide();
                  message.error(`查询失败,原因：${error.message}`);
                  return setLogModalVisibility(false);
                }
              } else {
                message.warning('请输入合规单号，示例前缀：IN、WV、OU');
              }
            }}
          >
            查询日志
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
        request={params => queryOpList(params)}
        pagination={{
          showSizeChanger: true,
          pageSize: 10,
          current: 1,
        }}
        columns={[
          ...columns,
          {
            title: '日志',
            dataIndex: 'option',
            valueType: 'option',
            render: (text, row) => [
              <a
                onClick={async () => {
                  const hide = message.loading('正在查询...');
                  try {
                    const { OpSN: id } = row;
                    const data = await queryUploadResult(id);
                    hide();
                    message.success('查询成功');
                    await setLogData(data);
                    return setLogModalVisibility(true);
                  } catch (error) {
                    hide();
                    message.error(`查询失败,原因：${error.message}`);
                    return setLogModalVisibility(false);
                  }
                }}
              >
                查询日志
              </a>,
              <TableDropdown
                onSelect={async key => {
                  const status = {
                    updatefalse: 0,
                    updatetrue: 1,
                  };
                  const hide = message.loading('正在同步...');
                  try {
                    const { OpSN: id } = row;
                    await updateStatus(id, status[key]);
                    actionRef.current.reload();
                    hide();
                    message.success('同步成功');
                  } catch (error) {
                    hide();
                    message.error('同步失败');
                  }
                }}
                menus={[
                  { key: 'updatefalse', name: '强制同步' },
                  { key: 'updatetrue', name: '同步成功' },
                ]}
              />,
            ],
          },
        ]}
      />
      <LogModal
        columns={logColumns}
        logData={logData}
        modalVisible={logModalVisibility}
        title="上传日志"
        onCancel={() => setLogModalVisibility(false)}
      ></LogModal>
    </PageHeaderWrapper>
  );
};

export default TableList;
