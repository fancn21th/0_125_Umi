import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryCargos } from './service';
import { columns } from '../../config/col-config-cargolist';
import { columns as cargoColumns } from '../../config/col-config-cargos';
import CargoModal from './components/CargoModal';
const { Search } = Input;
const { Text } = Typography;
let localAction = null;
const TableList = () => {
  const [keywordsValue, setKeywordsValue] = useState('');
  const [keywords, setKeywords] = useState('');
  const [InOrderNo, setInOrderNo] = useState('');
  const [InOrderNoValue, setInOrderNoValue] = useState('');
  const [cargoData, setCargoData] = useState([]);
  const [cargoModalVisibility, setCargoModalVisibility] = useState(false);

  const actionRef = useRef();

  const headerContent = (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <Text>入库单号：</Text>
      <Input
        placeholder="请输入单号"
        value={InOrderNoValue}
        onChange={e => {
          setInOrderNoValue(e.target.value);
        }}
      ></Input>
      <Button
        type="primary"
        onClick={() => {
          setKeywordsValue('');
          setKeywords('');
          localAction.resetPageIndex(1);
          setInOrderNo(InOrderNoValue);
        }}
      >
        查询
      </Button>
      <Button
        type="default"
        onClick={() => {
          setInOrderNoValue('');
          setInOrderNo('');
          setKeywordsValue('');
          setKeywords('');
          localAction.resetPageIndex(1);
        }}
      >
        重置
      </Button>
    </div>
  );

  return (
    <PageHeaderWrapper title={false} content={headerContent}>
      <ProTable
        headerTitle={false}
        actionRef={actionRef}
        rowKey="key"
        search={false}
        options={{ fullScreen: false, reload: true, setting: true }}
        beforeSearchSubmit={params => {
          setKeywordsValue('');
          setKeywords('');
          return params;
        }}
        params={{ keywords, InOrderNo }}
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
        request={params => queryCargos(params)}
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
          pageSize: 10,
          current: 1,
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
