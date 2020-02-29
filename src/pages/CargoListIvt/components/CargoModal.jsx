import React from 'react';
import { Button, Modal, Table } from 'antd';

const CargoModal = props => {
  const { modalVisible, onCancel, title, data, columns } = props;
  return (
    <Modal
      width={1200}
      title={title}
      visible={modalVisible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          取消
        </Button>,
      ]}
    >
      {data.length ? (
        <Table columns={columns} dataSource={data} pagination={false} rowKey="key" />
      ) : null}
    </Modal>
  );
};

export default CargoModal;
