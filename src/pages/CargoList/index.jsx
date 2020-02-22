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
  const [tableparams, setTableparams] = useState({
    sorter,
  });

  const actionRef = useRef();

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="库存记录"
        actionRef={actionRef}
        rowKey="key"
        search={true}
        onChange={(_, _filter, _sorter) => {
          setSorter(`${_sorter.field}_${_sorter.order}`);
        }}
        params={tableparams}
        toolBarRender={(action, { selectedRows }) => [
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
