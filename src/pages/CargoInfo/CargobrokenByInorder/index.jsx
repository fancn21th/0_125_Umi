import { Button, Divider, Dropdown, Menu, message, Input, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ImageModal from './components/ImageModal';
import { queryCargos } from './service';
import { columns } from '../../../config/col-config-cargobrokenbyinorder';

const { Search } = Input;
const { Text } = Typography;
let localAction = null;

const TableList = () => {
  const [imageModalVisibilyty, setImageModalVisibilyty] = useState(false);
  const [imgurls, setImgurls] = useState([]);
  const [InOrderNo, setInOrderNo] = useState('');
  const [InOrderNoValue, setInOrderNoValue] = useState('');
  const [modalIsLoading, setModalIsLoading] = useState(true);
  const [keywordsValue, setKeywordsValue] = useState('');
  const [keywords, setKeywords] = useState('');

  const actionRef = useRef();

  const headerContent = (
    <div className="dc-headerContent-wrapper">
      <Text>入库单号：</Text>
      <Input
        placeholder="请输入单号"
        value={InOrderNoValue}
        onChange={e => {
          setInOrderNoValue(e.target.value);
        }}
      ></Input>
      <Button
        type="primary"
        onClick={() => {
          setKeywordsValue('');
          setKeywords('');
          localAction.resetPageIndex(1);
          setInOrderNo(InOrderNoValue);
        }}
      >
        查询
      </Button>
      <Button
        type="default"
        onClick={() => {
          setInOrderNoValue('');
          setInOrderNo('');
          setKeywordsValue('');
          setKeywords('');
          localAction.resetPageIndex(1);
        }}
      >
        重置
      </Button>
    </div>
  );

  return (
    <PageHeaderWrapper title={false} content={headerContent}>
      <ProTable
        headerTitle={false}
        actionRef={actionRef}
        rowKey="key"
        search={false}
        options={{ fullScreen: false, reload: true, setting: true }}
        beforeSearchSubmit={params => {
          setKeywordsValue('');
          setKeywords('');
          return params;
        }}
        params={{ keywords, InOrderNo }}
        toolBarRender={(action, { selectedRows }) => {
          localAction = action;
          return [
            <Search
              placeholder="搜索..."
              onSearch={val => {
                setKeywords(val);
              }}
              onChange={e => {
                setKeywordsValue(e.target.value);
              }}
              value={keywordsValue}
              style={{ width: 200 }}
            />,
          ];
        }}
        request={params => queryCargos(params)}
        pagination={{
          showSizeChanger: true,
          pageSize: 10,
          current: 1,
        }}
        columns={[
          ...columns,
          {
            title: '破损照片',
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
