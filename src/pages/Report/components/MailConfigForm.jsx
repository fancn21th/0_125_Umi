import React from 'react';
import { Form, Input, Modal, Select, TimePicker } from 'antd';
import moment from 'moment';

const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;

const format = 'HH:mm';
const format2 = 'HH:mm:ss';

// const fakeMailConfig = {
//   content: '人员工作量日报表邮件',
//   daySendTime: 29,
//   id: 1,
//   monthSendTime: 12,
//   recipients: [
//     {
//       email: '455637644@qq.com',
//       id: 39,
//       name: 'mark',
//     },
//   ],
//   sendTime: '09:33',
//   subject: '人员工作量日报表邮件',
//   type: 'DAY_REPORT',
// };

// const fakeRecipients = [
//   {
//     createTime: 1581749583000,
//     email: '455637644@qq.com',
//     id: 39,
//     name: 'mark',
//     updateTime: 1582680130000,
//   },
//   {
//     createTime: 1581749891000,
//     email: 'bcd@qq.com',
//     id: 40,
//     name: 'bcdd',
//     updateTime: 1581750303000,
//   },
//   {
//     createTime: 1581750242000,
//     email: 'aaa@qq.com',
//     id: 41,
//     name: 'aaa1',
//     updateTime: 1582712440000,
//   },
//   {
//     createTime: 1582720380000,
//     email: 'xiaozl1@digitalchina.com',
//     id: 46,
//     name: 'tad',
//     updateTime: 1582720380000,
//   },
// ];

const convertMailConfig = config => {
  if (!config) return null;
  const { recipients, sendTime } = config;
  return {
    ...config,
    recipients: recipients.map(({ id }) => id),
    sendTime: moment(sendTime, format),
  };
};

const convertBackwardsMailConfig = config => {
  const { sendTime } = config;
  return {
    ...config,
    sendTime: moment(sendTime).format(format2),
  };
};

const MailConfigForm = props => {
  const [form] = Form.useForm();
  const { modalVisible, onSubmit: handleUpdate, onCancel, mailConfig, recipients, mode } = props;

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    const convertedFieldsValue = convertBackwardsMailConfig(fieldsValue);
    form.resetFields();
    handleUpdate(convertedFieldsValue);
  };

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: {
      span: 15,
    },
  };

  const monthRule =
    mode === 'year'
      ? [
          {
            required: true,
            message: '请选择月',
          },
        ]
      : null;

  const dayRule =
    mode === 'year' || mode === 'month'
      ? [
          {
            required: true,
            message: '请选择日',
          },
        ]
      : null;

  return (
    <Modal
      destroyOnClose
      title="邮件配置"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form hideRequiredMark={false} form={form} initialValues={convertMailConfig(mailConfig)}>
        <FormItem
          {...formItemLayout}
          label="邮件主题"
          name="subject"
          rules={[
            {
              required: true,
              message: '请输入邮件主题',
            },
          ]}
        >
          <Input placeholder="请输入邮件主题" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="收件人"
          name="recipients"
          rules={[
            {
              required: true,
              message: '请选择收件人',
            },
          ]}
        >
          <Select mode="multiple" placeholder="从常用联系人中选择">
            {recipients.map(({ id, email, name }) => (
              <Option key={id} value={id}>{`${name} (${email})`}</Option>
            ))}
          </Select>
        </FormItem>

        <Form.Item {...formItemLayout} label="发送时间">
          <Input.Group>
            {mode === 'year' ? (
              <Form.Item noStyle name="monthSendTime" rules={monthRule}>
                <Select placeholder="请选择月">
                  {[...new Array(12)].map((val, index) => (
                    <Option key={index} value={index + 1}>{`${index + 1} 月`}</Option>
                  ))}
                </Select>
              </Form.Item>
            ) : null}
            {mode !== 'day' ? (
              <Form.Item noStyle name="daySendTime" rules={dayRule}>
                <Select placeholder="请选择日">
                  {[...new Array(29)].map((val, index) =>
                    index === 28 ? (
                      <Option key={index} value={index + 1}>
                        每月最后一日
                      </Option>
                    ) : (
                      <Option key={index} value={index + 1}>{`${index + 1} 日`}</Option>
                    ),
                  )}
                </Select>
              </Form.Item>
            ) : null}
            <Form.Item
              noStyle
              name="sendTime"
              rules={[
                {
                  required: true,
                  message: '请输入时分',
                },
              ]}
            >
              <TimePicker format={format} />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <FormItem {...formItemLayout} label="内容" name="content">
          <TextArea
            style={{
              minHeight: 32,
            }}
            placeholder="请填写邮件内容"
            rows={4}
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default MailConfigForm;
