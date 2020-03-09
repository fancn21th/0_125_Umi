import { Button, Divider, Dropdown, Menu, message, Input, Typography, Select } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { connect } from 'dva';
import _ from 'lodash';
import { queryCargoListIvt } from './service';
import { columns } from './config/col-config-list';
import { columns as cargoColumns } from './config/col-config-cargos';
import config from './config/config';
import CargoModal from './components/CargoModal';
import uuid from '@/utils/uuid';
import data2ExcelJson from '@/utils/excel/data2ExcelJson';
import exportJson2Sheet from '@/utils/excel/exportJson2Sheet';
import expandCargos from '@/utils/excel/expandCargos';

const { tableTitle, headerTitle } = config;
const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;
let localAction = null;

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
  const [cargoData, setCargoData] = useState([]);
  const [cargoModalVisibility, setCargoModalVisibility] = useState(false);

  const actionRef = useRef();

  const headerContent = (
    <div className="dc-headerContent-wrapper">
      <Text>盘点编号：</Text>
      <Select
        style={{ width: 120 }}
        onChange={val => {
          setInventoryno(val);
        }}
      >
        {mapStringsToOptions(ivtList)}
      </Select>
    </div>
  );

  const hasNoData = () => new Promise(resolve => resolve([]));
  const hasData = params => {
    return queryCargoListIvt(params);
  };

  if (ivtList.length > 0) {
    return (
      <PageHeaderWrapper title={headerTitle} content={headerContent}>
        <div className="dc-pageHeaderWrapper-fix-ahead-panel">
          <Button
            type="primary"
            onClick={async () => {
              const { data } = await queryCargoListIvt({
                current: 1,
                pageSize: 1000000,
                inventoryno,
              });
              const expandedData = expandCargos(data);
              const body = expandedData.length
                ? data2ExcelJson(expandedData, [...columns, ...cargoColumns])
                : data2ExcelJson(data, columns);
              const headerOrder = [
                '入库单号',
                '货物RFID',
                '货位号',
                '物料行数',
                '单行号',
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
          </Button>
        </div>

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
          params={{ keywords, inventoryno }}
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
          request={hasData}
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
            defaultPageSize: 100,
            defaultCurrent: 1,
            pageSizeOptions: ['100', '200', '300', '400', '500'],
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
  }
  return (
    <PageHeaderWrapper title={headerTitle}>
      <ProTable
        headerTitle={tableTitle}
        actionRef={actionRef}
        rowKey="key"
        search={false}
        options={{ fullScreen: false, reload: true, setting: true }}
        params={{ keywords, inventoryno }}
        beforeSearchSubmit={params => {
          setKeywordsValue('');
          setKeywords('');
          return params;
        }}
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
        request={hasNoData}
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

export default connect(({ ivtlist }) => ivtlist)(TableList);
