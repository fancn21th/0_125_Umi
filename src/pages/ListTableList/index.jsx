import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryCargos } from './service';
import { columns } from '../../config/col-config-cargolist';
const { Search } = Input;
const { Text } = Typography;

const TableList = () => {
  const [sorter, setSorter] = useState({});
  const [searchText, setSearchText] = useState('');
  const [tableparams, setTableparams] = useState({
    sorter,
  });

  const actionRef = useRef();

  return (
    <PageHeaderWrapper title={false}>
      <ProTable
        headerTitle="库存记录"
        actionRef={actionRef}
        rowKey="key"
        search={true}
        options={{ fullScreen: false, reload: true, setting: true }}
        onChange={(_, _filter, _sorter) => {
          setSorter(`${_sorter.field}_${_sorter.order}`);
        }}
        params={tableparams}
        toolBarRender={(action, { selectedRows }) => [
          <Text>单号：</Text>,
          <Input
            placeholder="单号..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />,
          <Button
            type="primary"
            onClick={() =>
              setTableparams({
                ...tableparams,
                InOrderNo: searchText,
              })
            }
          >
            查询
          </Button>,
          <Button
            type="default"
            onClick={() => {
              setSearchText('');
              setTableparams({
                ...tableparams,
                InOrderNo: '',
              });
            }}
          >
            重置
          </Button>,
          <Search
            placeholder="search..."
            onSearch={val => {
              setTableparams({
                ...tableparams,
                InOrderNo: val,
              });
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
