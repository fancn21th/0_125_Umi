import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryCargos } from './service';
import { columns } from './config/config-col-list';
import { columns as cargoColumns } from './config/config-col-cargos';
import CargoModal from './components/CargoModal';
import config from './config/config';

const { tableTitle, headerTitle } = config;
const { Search } = Input;
const { Text } = Typography;
let localAction = null;
const TableList = () => {
  const [keywordsValue, setKeywordsValue] = useState('');
  const [keywords, setKeywords] = useState('');
  const [orderNoValue, setOrderNoValue] = useState('');
  const [orderno, setOrderno] = useState('');
  const [isNeedQuery, setIsNeedQuery] = useState(false);
  const [cargoData, setCargoData] = useState([]);
  const [cargoModalVisibility, setCargoModalVisibility] = useState(false);

  const actionRef = useRef();

  const headerContent = (
    <div className="dc-headerContent-wrapper">
      <Text>单号：</Text>
      <Input
        placeholder="请输入单号"
        value={orderNoValue}
        onChange={e => {
          setOrderNoValue(e.target.value);
        }}
      ></Input>
      <Button
        type="primary"
        onClick={() => {
          setKeywordsValue('');
          setKeywords('');
          setIsNeedQuery(true);
          localAction.resetPageIndex(1);
          setOrderno(orderNoValue);
        }}
      >
        查询
      </Button>
      <Button
        type="default"
        onClick={() => {
          setOrderNoValue('');
          setOrderno('');
          setKeywordsValue('');
          setKeywords('');
          setIsNeedQuery(false);
          localAction.resetPageIndex(1);
        }}
      >
        重置
      </Button>
    </div>
  );

  return (
    <PageHeaderWrapper title={headerTitle} content={headerContent}>
      <ProTable
        headerTitle={tableTitle}
        actionRef={actionRef}
        rowKey="key"
        search={false}
        options={{ fullScreen: false, reload: true, setting: true }}
        beforeSearchSubmit={params => {
          setKeywordsValue('');
          setKeywords('');
          return params;
        }}
        params={{ keywords, orderno }}
        toolBarRender={(action, { selectedRows }) => {
          localAction = action;
          return [
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
          ];
        }}
        request={params => {
          if (isNeedQuery) {
            return queryCargos(params);
          }
          return Promise.resolve({ success: true, data: [], total: 0 });
        }}
        columns={[
          ...columns,
          {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (text, row) => [
              <a
                onClick={async () => {
                  const { Cargos } = row;
                  if (Cargos.length > 0) {
                    await setCargoData([...Cargos]);
                    return setCargoModalVisibility(true);
                  }
                  message.warning('货物详情为空');
                  return setCargoModalVisibility(false);
                }}
              >
                货物详情
              </a>,
            ],
          },
        ]}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 10,
          defaultCurrent: 1,
        }}
      />
      <CargoModal
        columns={cargoColumns}
        data={cargoData}
        modalVisible={cargoModalVisibility}
        title="货物详情"
        onCancel={() => setCargoModalVisibility(false)}
      ></CargoModal>
    </PageHeaderWrapper>
  );
};

export default TableList;
