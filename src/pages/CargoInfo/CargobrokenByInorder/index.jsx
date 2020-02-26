import { Button, Divider, Dropdown, Menu, message, Input, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ImageModal from './components/ImageModal';
import { queryCargos } from './service';
import { columns } from '../../../config/col-config-cargobrokenbyinorder';

const { Search } = Input;
const { Text } = Typography;

const TableList = () => {
  const [imageModalVisibilyty, setImageModalVisibilyty] = useState(false);
  const [imgurls, setImgurls] = useState([]);
  const [modalIsLoading, setModalIsLoading] = useState(true);
  const [keywordsValue, setKeywordsValue] = useState('');
  const [keywords, setKeywords] = useState('');

  const actionRef = useRef();

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="货物破损"
        actionRef={actionRef}
        rowKey="key"
        search={true}
        beforeSearchSubmit={params => {
          setKeywordsValue('');
          setKeywords('');
          return params;
        }}
        params={{ keywords }}
        toolBarRender={(action, { selectedRows }) => [
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
            title: '破损照片',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (
              <>
                <a
                  onClick={() => {
                    console.log(record);
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
