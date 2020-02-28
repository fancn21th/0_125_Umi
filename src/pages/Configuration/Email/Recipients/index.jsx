import { Button, Divider, Dropdown, Menu, message, Input, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { queryCargos, update, add, remove } from './service';
import { columns } from '../../../../config/col-config-reportrecipients';

const { Search } = Input;
const { Text } = Typography;

/**
 * 添加节点
 * @param fields
 */

const handleAdd = async fields => {
  const hide = message.loading('正在新增');

  try {
    await add({
      name: fields.name,
      email: fields.email,
    });
    hide();
    message.success('新增成功');
    return true;
  } catch (error) {
    hide();
    message.error('新增失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async fields => {
  const hide = message.loading('正在编辑');
  try {
    await update({
      id: fields.id,
      name: fields.name,
      email: fields.email,
    });
    hide();
    message.success('编辑成功');
    return true;
  } catch (error) {
    hide();
    message.error('编辑失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param id
 */

const handleRemove = async id => {
  const hide = message.loading('正在删除');
  try {
    await remove({
      id,
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [eidtFormValues, setEidtFormValues] = useState({});
  const actionRef = useRef();

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="收件人配置"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        params={{}}
        options={{ fullScreen: false, reload: true, setting: true }}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            新增收件人
          </Button>,
        ]}
        request={params => queryCargos(params)}
        columns={[
          ...columns,
          {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (
              <>
                <a
                  onClick={() => {
                    handleUpdateModalVisible(true);
                    setEidtFormValues(record);
                  }}
                >
                  编辑
                </a>
                <Divider type="vertical" />
                <a
                  onClick={async () => {
                    const { id } = record;
                    await handleRemove(id);
                    if (actionRef.current) {
                      actionRef.current.reload();
                    }
                  }}
                >
                  删除
                </a>
              </>
            ),
          },
        ]}
        pagination={{
          showSizeChanger: true,
          pageSize: 10,
          current: 1,
        }}
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
      {eidtFormValues && Object.keys(eidtFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(value);

            if (success) {
              handleUpdateModalVisible(false);
              setEidtFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setEidtFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={eidtFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
