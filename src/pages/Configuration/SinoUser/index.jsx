// import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, Input, Form } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
// import styles from './style.less';

const FormItem = Form.Item;
// const { Option } = Select;
// const { RangePicker } = DatePicker;
const { Password } = Input;

const BasicForm = props => {
  const { submitting } = props;
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
      type: 'sinoUserForm/submitRegularForm',
      payload: values,
    });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = () => {};

  return (
    <PageHeaderWrapper content={<FormattedMessage id="sino-user-form.basic.description" />}>
      <Card bordered={false}>
        <Form
          hideRequiredMark={false}
          style={{
            marginTop: 8,
          }}
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="sino-user-form.username.title" />}
            name="username"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'sino-user-form.username.required',
                }),
              },
            ]}
          >
            <Input
              placeholder={formatMessage({
                id: 'sino-user-form.username.placeholder',
              })}
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="sino-user-form.name.title" />}
            name="name"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'sino-user-form.name.required',
                }),
              },
            ]}
          >
            <Input
              placeholder={formatMessage({
                id: 'sino-user-form.name.placeholder',
              })}
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="sino-user-form.pwd.title" />}
            name="pwd"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'sino-user-form.pwd.required',
                }),
              },
            ]}
          >
            <Password
              placeholder={formatMessage({
                id: 'sino-user-form.pwd.placeholder',
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
              <FormattedMessage id="sino-user-form.form.submit" />
            </Button>
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['sinoUserForm/submitRegularForm'],
}))(BasicForm);
