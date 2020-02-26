import React, { useState } from 'react';
import { Form, Input, Modal } from 'antd';
const FormItem = Form.Item;

const UpdateForm = props => {
  const [form] = Form.useForm();
  const { updateModalVisible, onSubmit: handleEdit, onCancel } = props;
  const [formVals, setFormVals] = useState({
    name: props.values.name,
    email: props.values.email,
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
      title="编辑收件人"
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form
        form={form}
        initialValues={{
          name: formVals.name,
          email: formVals.email,
        }}
      >
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="姓名"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入至少一个字符！',
              min: 1,
            },
          ]}
        >
          <Input placeholder="请输入姓名" />
        </FormItem>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="邮箱"
          name="email"
          rules={[
            {
              required: true,
              message: '请输入至少一个字符！',
              min: 1,
            },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
