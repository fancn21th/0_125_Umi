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

const TableList = () => {
  const [keywordsValue, setKeywordsValue] = useState('');
  const [keywords, setKeywords] = useState('');
  const [cargoData, setCargoData] = useState([]);
  const [cargoModalVisibility, setCargoModalVisibility] = useState(false);

  const actionRef = useRef();

  return (
    <PageHeaderWrapper title={false}>
      <ProTable
        headerTitle="库存记录"
        actionRef={actionRef}
        rowKey="key"
        search
        options={{ fullScreen: false, reload: true, setting: true }}
        beforeSearchSubmit={params => {
          setKeywordsValue('');
          setKeywords('');
          return params;
        }}
        params={{ keywords }}
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
