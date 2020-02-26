import { Button, Divider, Dropdown, DatePicker, message, Input, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import ImageModal from './components/ImageModal';
import { queryCargos, sendmail } from './service';
import { columns } from '../../../config/col-config-reportcargobroken';
import data2ExcelJson from '../../../utils/excel/data2ExcelJson';
import exportJson2Sheet from '../../../utils/excel/exportJson2Sheet';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Text } = Typography;

const TableList = () => {
  const [imageModalVisibilyty, setImageModalVisibilyty] = useState(false);
  const [modalIsLoading, setModalIsLoading] = useState(true);
  const [imgurls, setImgurls] = useState([]);
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

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="货物破损信息报表"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        params={tableparams}
        toolBarRender={(action, { selectedRows }) => [
          <Text>选择日期：</Text>,
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
          />,
          <Button
            type="primary"
            onClick={() => {
              const { dataSource } = action;
              const body = data2ExcelJson(dataSource, columns);
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
          </Button>,
          <Button type="primary">配置邮件信息</Button>,
          <Button
            type="default"
            onClick={async () => {
              const hide = message.loading('正在发送...');
              try {
                await sendmail({
                  startTime: tableparams['startTime'],
                  endTime: tableparams['endTime'],
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
          </Button>,
        ]}
        request={params => queryCargos(params)}
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
    </PageHeaderWrapper>
  );
};

export default TableList;
