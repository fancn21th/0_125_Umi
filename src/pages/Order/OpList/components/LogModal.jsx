import React from 'react';
import { Button, Modal, Table } from 'antd';

const LogModal = props => {
  const { modalVisible, onCancel, title, logData, columns } = props;
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
      {logData.length ? (
        <Table columns={columns} dataSource={logData} pagination={false} rowKey="key" />
      ) : null}
    </Modal>
  );
};

export default LogModal;
