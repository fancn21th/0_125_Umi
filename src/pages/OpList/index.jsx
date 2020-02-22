import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input, Typography, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { queryCargos } from './service';
import { columnFunc } from '../../config/col-config-oplist';
const columns = columnFunc(TableDropdown);
const { Search } = Input;
const { Text } = Typography;

const validate = ono => {
  const reg = /^(IN|WV|OU)[_a-zA-Z0-9]+/g;
  return ono !== '' && reg.test(ono);
};

const TableList = () => {
  const [sorter, setSorter] = useState({});
  const [searchText, setSearchText] = useState('');
  const [orderno, setOrderno] = useState('');
  const [opTableparams, setOpTableparams] = useState({
    sorter,
  });
  const [logTableparams, setLogTableparams] = useState({});
  const [logModalVisibility, setLogModalVisibility] = useState(false);

  const actionRef = useRef();

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="订单操作"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        onChange={(_, _filter, _sorter) => {
          setSorter(`${_sorter.field}_${_sorter.order}`);
        }}
        params={opTableparams}
        toolBarRender={(action, { selectedRows }) => [
          <Text>单号：</Text>,
          <Input
            placeholder="请输入单号"
            value={orderno}
            onChange={e => {
              setOrderno(e.target.value);
            }}
          ></Input>,
          <Button
            type="primary"
            onClick={() => {
              if (validate(orderno)) {
                setOpTableparams({
                  ...opTableparams,
                  OrderNo: orderno,
                });
              } else {
                message.warning('请输入合规单号，示例前缀：IN、WV、OU');
              }
            }}
          >
            查询
          </Button>,
          <Button
            type="default"
            onClick={() => {
              setOrderno('');
              setOpTableparams({
                ...opTableparams,
                OrderNo: '',
              });
            }}
          >
            重置
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              if (validate(orderno)) {
                setLogModalVisibility(true);
              } else {
                message.warning('请输入合规单号，示例前缀：IN、WV、OU');
              }
            }}
          >
            查询日志
          </Button>,
          <Search
            placeholder="search..."
            onSearch={val => {
              setOpTableparams({
                ...opTableparams,
                OrderNo: val,
              });
            }}
            style={{ width: 200 }}
          />,
        ]}
        request={params => queryCargos(params)}
        columns={columns}
      />
      <Modal
        visible={logModalVisibility}
        title="上传日志"
        onCancel={() => setLogModalVisibility(false)}
        footer={[
          <Button key="back" onClick={() => setLogModalVisibility(false)}>
            取消
          </Button>,
        ]}
      >
        test
      </Modal>
    </PageHeaderWrapper>
  );
};

export default TableList;
