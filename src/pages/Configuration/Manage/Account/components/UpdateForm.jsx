import React, { useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

const parseCode2Id = (code, roles) => {
  const match = roles.filter(item => item.roleCode === code);
  if (match.length) {
    return match[0].id;
  }
  return code;
};

const UpdateForm = props => {
  const [form] = Form.useForm();
  const { updateModalVisible, onSubmit: handleEdit, onCancel, roles } = props;
  const [formVals, setFormVals] = useState({
    username: props.values.username,
    email: props.values.email,
    roleId: parseCode2Id(props.values.roleCode, roles),
    realname: props.values.realname,
    phone: props.values.phone,
    id: props.values.id,
  });
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    await setFormVals({ ...formVals, ...fieldsValue });
    handleEdit({ ...formVals, ...fieldsValue });
  };

  return (
    <Modal
      destroyOnClose
      title="编辑信息"
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form
        form={form}
        initialValues={{
          username: formVals.username,
          realname: formVals.realname,
          roleId: formVals.roleId,
          phone: formVals.phone,
        }}
      >
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="角色"
          name="roleId"
          rules={[
            {
              required: true,
              message: '角色不能为空！',
            },
          ]}
        >
          <Select placeholder="请选择角色">
            {roles.map(({ id, roleCode }) => (
              <Option key={id} value={id}>{`${roleCode}`}</Option>
            ))}
          </Select>
        </FormItem>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: '输入不能为空！',
            },
          ]}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="姓名"
          name="realname"
          rules={[
            {
              required: true,
              message: '输入不能为空！',
            },
          ]}
        >
          <Input placeholder="请输入中文姓名" />
        </FormItem>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="电话"
          name="phone"
          rules={[]}
        >
          <Input placeholder="请输入电话号码" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
