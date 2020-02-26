import React from 'react';
import { Form, Input, Modal } from 'antd';
const FormItem = Form.Item;

const CreateForm = props => {
  const [form] = Form.useForm();
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd(fieldsValue);
  };

  return (
    <Modal
      destroyOnClose
      title="新增收件人"
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

export default CreateForm;
