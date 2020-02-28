import { Button, Divider, Dropdown, DatePicker, message, Input, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import { queryRecipients } from '@/services/recipients';
import { queryEmailSetting, updateEmailSetting } from '@/services/emailConfig';
import ImageModal from './components/ImageModal';
import { queryCargos, sendmail } from './service';
import { columns } from '../../../config/col-config-reportcargobroken';
import data2ExcelJson from '../../../utils/excel/data2ExcelJson';
import exportJson2Sheet from '../../../utils/excel/exportJson2Sheet';
import MailConfigForm from '../components/MailConfigForm';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Text } = Typography;

const TableList = () => {
  const [datasource, setDatasource] = useState(null);
  const [emailConfigModalVisible, setEmailModalConfigVisible] = useState(false);
  const [imageModalVisibilyty, setImageModalVisibilyty] = useState(false);
  const [modalIsLoading, setModalIsLoading] = useState(true);
  const [imgurls, setImgurls] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [mailConfig, setMailConfig] = useState(null);
  const [searchText, setSearchText] = useState('');
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
      setMailConfig(emailSettingRes);
      setEmailModalConfigVisible(true);
      hide();
      return true;
    } catch (error) {
      hide();
      message.error('获取常用联系人失败');
      return false;
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

      setEmailModalConfigVisible(false);
      return true;
    } catch (error) {
      hide();
      message.error('邮件配置更新失败,请重试');
      return false;
    }
  };
  const headerContent = (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <Text>选择日期：</Text>
      <RangePicker
        format="YYYY-MM-DD"
        defaultValue={[moment().startOf('day'), moment().endOf('day')]}
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
      <Button
        type="default"
        onClick={async () => {
          const hide = message.loading('正在发送...');
          try {
            await sendmail({
              startTime: tableparams.startTime,
              endTime: tableparams.endTime,
            });
            hide();
            message.success('发送成功');
          } catch (error) {
            hide();
            message.error(`发送失败,原因：${error.message}`);
          }
        }}
      >
        手动发送
      </Button>
    </div>
  );

  return (
    <PageHeaderWrapper content={headerContent}>
      <ProTable
        headerTitle="货物破损信息报表"
        actionRef={actionRef}
        rowKey="key"
        options={{ fullScreen: false, reload: true, setting: true }}
        search={false}
        params={tableparams}
        request={async params => {
          const data = await queryCargos(params);
          const { data: datasource } = data;
          await setDatasource(datasource);
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
                    const { img } = record;
                    const imgs = img.map(img => ({ url: img }));
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
      <MailConfigForm
        mode="day"
        recipients={recipients}
        mailConfig={mailConfig}
        onSubmit={onUpdateMailConfig}
        onCancel={() => setEmailModalConfigVisible(false)}
        modalVisible={emailConfigModalVisible}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
