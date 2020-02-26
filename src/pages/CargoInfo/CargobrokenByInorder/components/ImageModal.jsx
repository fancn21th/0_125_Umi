import React from 'react';
import { Modal, Button, Card, List } from 'antd';

const { Meta } = Card;

const ImageModal = props => {
  const { modalVisible, onCancel, imgurls, loading } = props;

  return (
    <Modal
      destroyOnClose
      title="破损图片"
      visible={modalVisible}
      onCancel={onCancel}
      width="80vw"
      footer={[
        <Button key="cancle" onClick={onCancel}>
          取消
        </Button>,
      ]}
    >
      <List
        rowKey="id"
        loading={loading}
        grid={{ gutter: 24, lg: 2, md: 2, sm: 1, xs: 1 }}
        dataSource={imgurls}
        renderItem={(item, idx) => {
          const url = `http://36.110.117.58:8000/sinoapi/img/${item.url}`;
          return (
            <List.Item key={item.url}>
              <Card
                hoverable
                onClick={() => window.open(url, '_blank')}
                style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
                cover={
                  <div
                    style={{
                      backgroundImage: `url('${url}')`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: 'contain',
                      width: '30vw',
                      height: '30vw',
                    }}
                  ></div>
                }
              >
                <Meta
                  style={{ textAlign: 'center' }}
                  title={`图片${idx + 1}`}
                  description={
                    <a href={url} target="_blank">
                      查看完整图片
                    </a>
                  }
                />
              </Card>
            </List.Item>
          );
        }}
      />
    </Modal>
  );
};

export default ImageModal;
