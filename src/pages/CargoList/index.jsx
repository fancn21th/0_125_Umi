import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { connect } from 'dva';
import { queryCargos } from './service';
import { columns } from '../../config/col-config-cargolist';

const { Search } = Input;
const { Text } = Typography;

const TableList = ({ cargoNoList }) => {
  const [sorter, setSorter] = useState({});
  const [tableparams, setTableparams] = useState({
    sorter,
  });
  const actionRef = useRef();
  const hasNoData = () => new Promise(resolve => resolve([]));
  const hasData = params => queryCargos(params);

  if (cargoNoList.length > 0) {
    return (
      <PageHeaderWrapper>
        <ProTable
          headerTitle="库存记录"
          actionRef={actionRef}
          rowKey="key"
          search
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
          request={hasData}
          columns={columns}
        />
      </PageHeaderWrapper>
    );
  }
  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="库存记录"
        actionRef={actionRef}
        rowKey="key"
        search
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
        request={hasNoData}
        columns={columns}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ cargolist }) => cargolist)(TableList);
