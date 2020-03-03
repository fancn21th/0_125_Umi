import { Button, Divider, Modal, message, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import UpdatePasswordForm from './components/UpdatePasswordForm';
import { queryCargos, update, add, remove, queryRoles, updatePassword } from './service';
import { columns } from '../../../config/col-config-account';

const { Search } = Input;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async fields => {
  const hide = message.loading('正在新增');
  const res = await add({
    username: fields.username,
    realname: fields.realname,
    phone: fields.phone,
    roleId: fields.roleId,
    email: fields.email,
    password: fields.password,
    confirmPassword: fields.confirmPassword,
  });
  hide();
  if (res && !res.ok) {
    return false;
  }
  message.success('新增成功');
  return true;
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async fields => {
  const hide = message.loading('正在编辑');
  const res = await update({
    id: fields.id,
    realname: fields.realname,
    phone: fields.phone,
    roleId: +fields.roleId,
    email: fields.email,
  });
  hide();
  if (res && !res.ok) {
    return false;
  }
  message.success('编辑成功');
  return true;
};

/**
 * 更新密码
 * @param fields
 */
const handleUpdatePassword = async fields => {
  const hide = message.loading('正在修改');
  const res = await updatePassword({
    id: fields.id,
    password: fields.password,
    confirmPassword: fields.confirmPassword,
  });
  hide();
  if (res && !res.ok) {
    return false;
  }
  message.success('修改成功');
  return true;
};

/**
 *  删除节点
 * @param id
 */
const handleRemove = async id =>
  new Promise((resolve, reject) => {
    Modal.confirm({
      title: '删除账号',
      content: '确定删除该账号吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在删除');
        try {
          await remove({
            id,
          });
          hide();
          message.success('删除成功，即将刷新');
          resolve(true);
        } catch (error) {
          hide();
          message.error('删除失败，请重试');
          reject(new Error('删除失败'));
        }
      },
    });
  });

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [updatePasswordModalVisible, handleUpdatePasswordModalVisible] = useState(false);
  const [editFormValues, setEditFormValues] = useState({});
  const [passwordFormValues, setPasswordFormValues] = useState({});
  const [roleSelect, setRoleSelect] = useState([]);
  const [keywordsValue, setKeywordsValue] = useState('');
  const [keywords, setKeywords] = useState('');
  const actionRef = useRef();

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="账号管理"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        params={{ keywords }}
        options={{ fullScreen: false, reload: true, setting: true }}
        toolBarRender={() => [
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
          <Button
            type="primary"
            onClick={async () => {
              const roles = await queryRoles({ pageNum: 1, pageSize: 1000 });
              await setRoleSelect(roles);
              handleModalVisible(true);
            }}
          >
            添加用户
          </Button>,
        ]}
        request={params => queryCargos(params)}
        columns={[
          ...columns,
          {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) =>
              record.roleCode !== 'SUPERADMIN' ? (
                <>
                  <a
                    onClick={async () => {
                      const roles = await queryRoles({ pageNum: 1, pageSize: 1000 });
                      await setRoleSelect(roles);
                      await setEditFormValues(record);
                      handleUpdateModalVisible(true);
                    }}
                  >
                    编辑
                  </a>
                  <Divider type="vertical" />
                  <a
                    onClick={async () => {
                      await setPasswordFormValues({ id: record.id });
                      handleUpdatePasswordModalVisible(true);
                    }}
                  >
                    修改密码
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
              ) : (
                ''
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
        roles={roleSelect}
        onSubmit={async (value, callback) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            callback(true);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          } else {
            callback(false);
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {editFormValues && Object.keys(editFormValues).length ? (
        <UpdateForm
          roles={roleSelect}
          onSubmit={async value => {
            const success = await handleUpdate(value);

            if (success) {
              handleUpdateModalVisible(false);
              setEditFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setEditFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={editFormValues}
        />
      ) : null}
      {passwordFormValues && Object.keys(passwordFormValues).length ? (
        <UpdatePasswordForm
          values={passwordFormValues}
          onSubmit={async value => {
            const success = await handleUpdatePassword(value);

            if (success) {
              handleUpdatePasswordModalVisible(false);
              setPasswordFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdatePasswordModalVisible(false);
            setPasswordFormValues({});
          }}
          updateModalVisible={updatePasswordModalVisible}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
