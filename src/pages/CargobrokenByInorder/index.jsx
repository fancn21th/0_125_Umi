import { Button, Divider, Dropdown, Menu, message, Input, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ImageModal from './components/ImageModal';
import { queryCargos } from './service';
import { columns } from '../../config/col-config-cargobrokenbyinorder';
const { Search } = Input;
const { Text } = Typography;

//测试用默认入库单号
const defaultNo = 'INS4211136251920190830000005';

const TableList = () => {
  const [sorter, setSorter] = useState({});
  const [imageModalVisibilyty, setImageModalVisibilyty] = useState(false);
  const [imgurls, setImgurls] = useState([]);
  const [modalIsLoading, setModalIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [tableparams, setTableparams] = useState({
    sorter,
    InOrderNo: defaultNo,
  });

  const actionRef = useRef();

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="货物破损"
        actionRef={actionRef}
        rowKey="key"
        search={true}
        onChange={(_, _filter, _sorter) => {
          setSorter(`${_sorter.field}_${_sorter.order}`);
        }}
        params={tableparams}
        toolBarRender={(action, { selectedRows }) => [
          <Search
            placeholder="search..."
            onSearch={val => {
              setTableparams({
                ...tableparams,
                InOrderNo: val,
              });
            }}
            style={{ width: 200 }}
          />,
        ]}
        request={params => queryCargos(params)}
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
