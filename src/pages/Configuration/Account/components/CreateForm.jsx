import React from 'react';
import { Form, Input, Modal, Select } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;
const { Password } = Input;

const CreateForm = props => {
  const [form] = Form.useForm();
  const { modalVisible, onSubmit: handleAdd, onCancel, roles } = props;

  const onCallback = ok => {
    if (ok) {
      form.resetFields();
    }
  };

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    handleAdd(fieldsValue, onCallback);
  };

  return (
    <Modal
      destroyOnClose
      title="新增账号"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
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
              message: '输入不能为空！',
            },
          ]}
        >
          <Select placeholder="请选择角色" onChange={() => {}}>
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
          <Input placeholder="请输入用户名" />
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
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '输入不能为空！',
            },
          ]}
        >
          <Password placeholder="请输入密码" />
        </FormItem>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="确认密码"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: '输入不能为空！',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('密码与确认密码不匹配!'));
              },
            }),
          ]}
        >
          <Password placeholder="请输入确认密码" />
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

export default CreateForm;
