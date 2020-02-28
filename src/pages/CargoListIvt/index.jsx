import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input, Typography, Select } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { connect } from 'dva';
import { queryCargoListIvt } from './service';
import { columns } from '../../config/col-config-cargolistivt';
import uuid from '../../utils/uuid';
import data2ExcelJson from '../../utils/excel/data2ExcelJson';
import exportJson2Sheet from '../../utils/excel/exportJson2Sheet';

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
  const [keywordsValue, setKeywordsValue] = useState('');
  const [keywords, setKeywords] = useState('');
  const [inventoryno, setInventoryno] = useState('');

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
          beforeSearchSubmit={params => {
            setKeywordsValue('');
            setKeywords('');
            return params;
          }}
          params={{ keywords, inventoryno }}
          toolBarRender={(action, { selectedRows }) => [
            <Text>盘点编号：</Text>,
            <Select
              style={{ width: 120 }}
              onChange={val => {
                setInventoryno(val);
              }}
            >
              {mapStringsToOptions(ivtList)}
            </Select>,
            <Button
              type="primary"
              onClick={async () => {
                const { data } = await queryCargoListIvt({
                  current: 1,
                  pageSize: 10000000,
                  inventoryno,
                });
                const body = data2ExcelJson(data, columns);
                const headerOrder = [
                  '入库单号',
                  '货物RFID',
                  '货位号',
                  '物料行数',
                  '行号',
                  '物料号',
                  '物料名',
                  '批次号',
                  '应收',
                  '实收',
                  '包装',
                  '危险等级',
                  '货物状态',
                  '盘点状态',
                  '盘点时间',
                ];
                const sheetname = '盘库记录';
                const filename = '库存盘点表';
                return exportJson2Sheet(body, headerOrder, sheetname, filename);
              }}
            >
              导出表格
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
        params={{ keywords, inventoryno }}
        beforeSearchSubmit={params => {
          setKeywordsValue('');
          setKeywords('');
          return params;
        }}
        toolBarRender={(action, { selectedRows }) => [
          <Text>盘点编号：</Text>,
          <Select default="loading" style={{ width: 120 }} loading>
            <Option value="loading">loading...</Option>
          </Select>,
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
