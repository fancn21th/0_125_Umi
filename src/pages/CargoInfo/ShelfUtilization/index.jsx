import { Input } from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const ShelfUtilization = () => {
  const mainSearch = (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <Input.Search
        placeholder="请输入"
        enterButton="搜索"
        size="large"
        style={{
          maxWidth: 522,
          width: '100%',
        }}
      />
    </div>
  );
  return <PageHeaderWrapper content={mainSearch}></PageHeaderWrapper>;
};

export default ShelfUtilization;
