// import { InfoCircleOutlined } from '@ant-design/icons';
import {
  Button,
  message,
  Card,
  // DatePicker,
  Input,
  Form,
  // InputNumber,
  // Radio,
  Select,
  // Tooltip,
} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';

const FormItem = Form.Item;
const { Option } = Select;

const BasicForm = props => {
  const { submitting, sender } = props;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 12,
      },
      md: {
        span: 10,
      },
    },
  };
  const submitFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 7,
      },
    },
  };

  const onFinish = values => {
    const { dispatch } = props;
    dispatch({
      type: 'emailSenderForm/submitRegularForm',
      payload: values,
    });
  };

  const onFinishFailed = errorInfo => {
    console.error('Failed:', errorInfo);
  };

  const onValuesChange = () => {};

  // 坑: https://blog.csdn.net/weixin_33736649/article/details/91392178
  useEffect(() => {
    form.resetFields();
  }, [sender]);

  return (
    <PageHeaderWrapper
      title={false}
      content={<FormattedMessage id="email-sending-config-form.basic.description" />}
    >
      <Card bordered={false}>
        <Form
          hideRequiredMark={false}
          style={{
            marginTop: 8,
          }}
          form={form}
          name="basic"
          initialValues={sender}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="email-sending-config-form.host.title" />}
            name="smtpHost"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'email-sending-config-form.host.required',
                }),
              },
            ]}
          >
            <Input
              placeholder={formatMessage({
                id: 'email-sending-config-form.host.placeholder',
              })}
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="email-sending-config-form.user.title" />}
            name="smtpFromEmail"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'email-sending-config-form.user.required',
                }),
              },
            ]}
          >
            <Input
              placeholder={formatMessage({
                id: 'email-sending-config-form.user.placeholder',
              })}
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="email-sending-config-form.password.title" />}
            name="smtpPassword"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'email-sending-config-form.password.required',
                }),
              },
            ]}
          >
            <Input
              placeholder={formatMessage({
                id: 'email-sending-config-form.password.placeholder',
              })}
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="email-sending-config-form.ssl.title" />}
            name="smtpSslEnable"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'email-sending-config-form.ssl.required',
                }),
              },
            ]}
          >
            <Select
              placeholder={formatMessage({
                id: 'email-sending-config-form.ssl.placeholder',
              })}
            >
              <Option value>
                {formatMessage({
                  id: 'email-sending-config-form.ssl.option.a',
                })}
              </Option>
              <Option value={false}>
                {formatMessage({
                  id: 'email-sending-config-form.ssl.option.b',
                })}
              </Option>
            </Select>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="email-sending-config-form.port.title" />}
            name="smtpPost"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'email-sending-config-form.port.required',
                }),
              },
            ]}
          >
            <Input
              placeholder={formatMessage({
                id: 'email-sending-config-form.port.placeholder',
              })}
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="email-sending-config-form.sender.title" />}
            name="smtpFromUserName"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'email-sending-config-form.sender.required',
                }),
              },
            ]}
          >
            <Input
              placeholder={formatMessage({
                id: 'email-sending-config-form.sender.placeholder',
              })}
            />
          </FormItem>

          <FormItem
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit" loading={submitting}>
              <FormattedMessage id="email-sending-config-form.form.submit" />
            </Button>
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading, emailSenderForm: { sender } }) => ({
  submitting: loading.effects['emailSenderForm/submitRegularForm'],
  sender,
}))(BasicForm);
