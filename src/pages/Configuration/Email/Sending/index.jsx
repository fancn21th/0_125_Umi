import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Input, Form, InputNumber, Radio, Select, Tooltip } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const BasicForm = props => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const [showPublicUsers, setShowPublicUsers] = React.useState(false);
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
      type: 'formAndbasicForm/submitRegularForm',
      payload: values,
    });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = changedValues => {
    const { publicType } = changedValues;
    if (publicType) setShowPublicUsers(publicType === '2');
  };

  return (
    <PageHeaderWrapper
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
          initialValues={{
            public: '1',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="email-sending-config-form.host.title" />}
            name="host"
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
            name="user"
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
            name="password"
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
            name="ssl"
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
              <Option value="{true}">
                {formatMessage({
                  id: 'email-sending-config-form.ssl.option.a',
                })}
              </Option>
              <Option value="{false}">
                {formatMessage({
                  id: 'email-sending-config-form.ssl.option.b',
                })}
              </Option>
            </Select>
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
            <Button
              style={{
                marginLeft: 8,
              }}
            >
              <FormattedMessage id="email-sending-config-form.form.save" />
            </Button>
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['formAndbasicForm/submitRegularForm'],
}))(BasicForm);
