import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input, Typography, Select } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { connect } from 'dva';
import { queryCargoListIvt } from './service';
import { columns } from '../../config/col-config-cargolistivt';
import uuid from '../../utils/uuid';
import data2ExcelJson from '../../utils/cargoData2ExcelJson';
import exportJson2Sheet from '../../utils/exportJson2Sheet';

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

const mapStringToOption = function(str) {
  return (
    <Option value={str} key={uuid()}>
      {str}
    </Option>
  );
};

const mapStringsToOptions = function(arr) {
  return arr.map(mapStringToOption);
};

const TableList = ({ ivtList }) => {
  const [sorter, setSorter] = useState({});
  const [searchText, setSearchText] = useState('');
  const [tableparams, setTableparams] = useState({
    sorter,
  });
  const actionRef = useRef();
  const hasNoData = () => new Promise(resolve => resolve([]));
  const hasData = params => {
    return queryCargoListIvt(params);
  };

  if (ivtList.length > 0) {
    return (
      <PageHeaderWrapper>
        <ProTable
          headerTitle="盘库记录"
          actionRef={actionRef}
          rowKey="key"
          search={false}
          onChange={(_, _filter, _sorter) => {
            setSorter(`${_sorter.field}_${_sorter.order}`);
          }}
          params={tableparams}
          toolBarRender={(action, { selectedRows }) => [
            <Button
              type="primary"
              onClick={() => {
                const { dataSource } = action;
                const { body, header } = data2ExcelJson(dataSource, columns);
                const sheetname = '盘库记录';
                const filename = '库存盘点表';
                return exportJson2Sheet(body, header, sheetname, filename);
              }}
            >
              导出表格
            </Button>,
            <Text>盘点编号：</Text>,
            <Select
              style={{ width: 120 }}
              onChange={val => {
                setTableparams({
                  ...tableparams,
                  inventoryno: val,
                });
              }}
            >
              {mapStringsToOptions(ivtList)}
            </Select>,
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
          request={hasData}
          columns={columns}
          pagination={{
            showSizeChanger: true,
            pageSize: 10,
            current: 1,
          }}
        />
      </PageHeaderWrapper>
    );
  }
  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="盘库记录"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        onChange={(_, _filter, _sorter) => {
          setSorter(`${_sorter.field}_${_sorter.order}`);
        }}
        params={tableparams}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary">导出表格</Button>,
          <Text>盘点编号：</Text>,
          <Select default="loading" style={{ width: 120 }} loading>
            <Option value="loading">loading...</Option>
          </Select>,
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
        request={hasNoData}
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

export default connect(({ ivtlist }) => ivtlist)(TableList);
