import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Dropdown, Menu, DatePicker, Select } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { getWorkloads } from './service';
import { columns } from '../../config/col-config-workloads';

const { RangePicker } = DatePicker;
const { Option } = Select;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async fields => {};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async fields => {};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async selectedRows => {};

// 默认起止时间
const defaultDate = [
  moment()
    .startOf('year')
    .valueOf(),
  moment()
    .endOf('year')
    .valueOf(),
];

const TableList = () => {
  const [sorter, setSorter] = useState(defaultDate);
  const [type, setType] = useState('');
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="年工作量"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        params={{
          sorter,
          type,
        }}
        toolBarRender={(action, { selectedRows }) => [
          <RangePicker
            format="YYYY"
            defaultValue={[moment().startOf('year'), moment().endOf('year')]}
            onChange={date => {
              const dateArr = [date[0].valueOf(), date[1].valueOf()];
              setSorter(dateArr);
            }}
          />,
          <Select
            defaultValue=""
            onChange={val => {
              setType(val);
            }}
          >
            <Option value="" key="1">
              人员
            </Option>
            <Option value="1" key="2">
              叉车
            </Option>
          </Select>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
            已选择{' '}
            <a
              style={{
                fontWeight: 600,
              }}
            >
              {selectedRowKeys.length}
            </a>{' '}
            项&nbsp;&nbsp;
            <span>
              服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
            </span>
          </div>
        )}
        request={params => getWorkloads(params)}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm
        onSubmit={async value => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(value);

            if (success) {
              handleModalVisible(false);
              setStepFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default Form.create()(TableList);
