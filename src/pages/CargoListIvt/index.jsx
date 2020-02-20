import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input, Typography, Select } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryCargoListIvt, queryIvtList } from './service';
import { columns } from '../../config/col-config-cargolistivt';
import compose from '../../utils/compose';
const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

const getOptionsOnLoad = async function({ pageindex, pagesize }) {
  return await queryIvtList({
    pageindex,
    pagesize,
  });
};

const mapStringToOption = function(str) {
  return (
    <Option value={str} key={Date.now().toString(36)}>
      {str}
    </Option>
  );
};

const mapStringsToOptions = function(arr) {
  return arr.map(mapStringToOption);
};

const generateOptions = function(promise) {
  return promise.then(mapStringsToOptions);
};

const getOptions = compose(getOptionsOnLoad, generateOptions);

const TableList = () => {
  const [sorter, setSorter] = useState({});
  const [searchText, setSearchText] = useState('');
  const [tableparams, setTableparams] = useState({
    sorter,
  });
  const [options, setOptions] = useState([]);
  const actionRef = useRef();
  getOptions({
    pageindex: 0,
    pagesize: 100,
  }).then(res => setOptions(res));

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
          <Text>盘点编号：</Text>,
          options.length ? (
            <Select defaultValue="default" style={{ width: 120 }}>
              <Option value="default">default</Option>
              {options}
            </Select>
          ) : (
            <Select defaultValue="loading" style={{ width: 120 }} loading>
              <Option value="loading">Loading...</Option>
            </Select>
          ),
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
        request={params => queryCargoListIvt(params)}
        columns={columns}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
