import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryCargos } from './service';
import { columns } from './col-config';
const { Search } = Input;
const { Text } = Typography;

const TableList = () => {
  const [sorter, setSorter] = useState({});
  const [orderno, setOrderno] = useState('');
  const [searchText, setSearchText] = useState('');

  const actionRef = useRef();

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="订单操作"
        actionRef={actionRef}
        rowKey="key"
        search={true}
        onChange={(_, _filter, _sorter) => {
          setSorter(`${_sorter.field}_${_sorter.order}`);
        }}
        params={{
          sorter,
          InOrderNo: orderno,
        }}
        toolBarRender={(action, { selectedRows }) => [
          <Text>单号：</Text>,
          <Input placeholder="单号..." value={searchText} onChange={e => setSearchText(e.target.value)} />,
          <Button type="primary" onClick={() => setOrderno(searchText)}>
            查询
          </Button>,
          <Button type="default" onClick={() => {
            setSearchText('');
            setOrderno('');
          }}>
            重置
          </Button>,
          <Search
            placeholder="search..."
            onSearch={val => {
              setOrderno(val);
            }}
            style={{ width: 200 }}
          />,
        ]}
        request={params => queryCargos(params)}
        columns={columns}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
