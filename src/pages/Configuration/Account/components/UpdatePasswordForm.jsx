import React, { useState } from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;

const UpdatePasswordForm = props => {
  const [form] = Form.useForm();
  const { updateModalVisible, onSubmit: handleEdit, onCancel } = props;
  const [formVals, setFormVals] = useState({
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
      title="修改密码"
      visible={updateModalVisible}
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
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '输入不能为空！',
            },
          ]}
        >
          <Input placeholder="请输入密码" />
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
          ]}
        >
          <Input placeholder="请输入密码" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdatePasswordForm;
