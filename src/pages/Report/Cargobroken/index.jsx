import { Button, DatePicker, message, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { queryRecipients } from '@/services/recipients';
import { queryEmailSetting, updateEmailSetting } from '@/services/emailConfig';
import data2ExcelJson from '@/utils/excel/data2ExcelJson';
import exportJson2Sheet from '@/utils/excel/exportJson2Sheet';
import ImageModal from './components/ImageModal';
import { queryCargos, sendmail } from './service';
import { columns } from './config/col-config';
import config from './config/config';
import MailConfigForm from '../components/MailConfigForm';

const { tableTitle, headerTitle, defaultDate } = config;
const { RangePicker } = DatePicker;
const { Text } = Typography;

const TableList = () => {
  const [emailConfigModalVisible, setEmailModalConfigVisible] = useState(false);
  const [mailConfig, setMailConfig] = useState({});
  const [datasource, setDatasource] = useState(null);
  const [imageModalVisibilyty, setImageModalVisibilyty] = useState(false);
  const [modalIsLoading, setModalIsLoading] = useState(true);
  const [imgurls, setImgurls] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [tableparams, setTableparams] = useState({
    startTime: moment()
      .startOf('day')
      .valueOf(),
    endTime: moment()
      .endOf('day')
      .valueOf(),
  });

  const actionRef = useRef();

  // 点击邮件配置按钮回调
  const onEmailConfigClick = async () => {
    const hide = message.loading('正在加载邮件配置');

    try {
      const { data: recipientsRes } = await queryRecipients();
      setRecipients(recipientsRes);
      const emailSettingRes = await queryEmailSetting({
        category: 'broken',
        mode: 'day',
      });
      await setMailConfig(emailSettingRes);
      setEmailModalConfigVisible(true);
      hide();
    } catch (error) {
      hide();
      message.error('获取常用联系人失败');
    }
  };

  // 更新邮件配置回调
  const onUpdateMailConfig = async data => {
    const hide = message.loading('正在更新');
    try {
      await updateEmailSetting({
        category: 'broken',
        mode: 'day',
        data,
      });
      hide();
      message.success('邮件配置更新成功');
      await setEmailModalConfigVisible(false);
      setMailConfig({});
    } catch (error) {
      hide();
      message.error('邮件配置更新失败,请重试');
    }
  };

  // 更新邮件配置取消
  const onCancelMailConfig = async () => {
    await setEmailModalConfigVisible(false);
    await setMailConfig({});
  };

  const headerContent = (
    <div className="dc-headerContent-wrapper">
      <Text>选择日期：</Text>
      <RangePicker
        format="YYYY-MM-DD"
        defaultValue={defaultDate}
        onChange={date => {
          if (date && date.length) {
            setTableparams({
              ...tableparams,
              startTime: date[0].valueOf(),
              endTime: date[1].valueOf(),
            });
          }
        }}
      />
      <Button type="primary" onClick={onEmailConfigClick}>
        配置邮件信息
      </Button>

      <Button
        type="default"
        onClick={async () => {
          const hide = message.loading('正在发送...');
          const res = await sendmail({
            startTime: tableparams.startTime,
            endTime: tableparams.endTime,
          });
          hide();
          if (res) {
            message.error('发送失败');
          } else {
            message.success('发送成功');
          }
        }}
      >
        手动发送
      </Button>
    </div>
  );

  return (
    <PageHeaderWrapper title={headerTitle} content={headerContent}>
      <div className="dc-pageHeaderWrapper-fix-ahead-panel">
        <Button
          type="primary"
          onClick={() => {
            const body = data2ExcelJson(datasource, columns);
            const headerOrder = [
              '货物RFID',
              '入库单号',
              '单行号',
              '货主代码',
              '物料名',
              '件数',
              '当前货位',
              '破损情况',
            ];
            const sheetname = '货物破损信息报表';
            const filename = '货物破损信息报表';
            return exportJson2Sheet(body, headerOrder, sheetname, filename);
          }}
        >
          导出报表
        </Button>
      </div>
      <ProTable
        headerTitle={tableTitle}
        actionRef={actionRef}
        rowKey="key"
        options={{ fullScreen: false, reload: true, setting: true }}
        search={false}
        params={tableparams}
        request={async params => {
          const data = await queryCargos(params);
          const { data: datasource2 } = data;
          await setDatasource(datasource2);
          return data;
        }}
        pagination={{
          showSizeChanger: true,
          pageSize: 10,
          current: 1,
        }}
        columns={[
          ...columns,
          {
            title: '拍照信息',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (
              <>
                <a
                  onClick={() => {
                    const { Img } = record;
                    const imgs = Img.map(img => ({ url: img }));
                    setImgurls(imgs);
                    setModalIsLoading(false);
                    setImageModalVisibilyty(true);
                  }}
                >
                  查看
                </a>
              </>
            ),
          },
        ]}
      />
      <ImageModal
        modalVisible={imageModalVisibilyty}
        onCancel={() => {
          setModalIsLoading(true);
          setImageModalVisibilyty(false);
        }}
        imgurls={imgurls}
        loading={modalIsLoading}
      ></ImageModal>

      {mailConfig && Object.keys(mailConfig).length ? (
        <MailConfigForm
          mode="day"
          recipients={recipients}
          mailConfig={mailConfig}
          onSubmit={onUpdateMailConfig}
          onCancel={onCancelMailConfig}
          modalVisible={emailConfigModalVisible}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
