import { DatePicker, Button, Card } from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import BarChart from './components/BarChart';

const { RangePicker } = DatePicker;

const ShelfUtilization = () => {
  const mainSearch = (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <RangePicker format="YYYY-MM-DD" placeholder={['开始日期', '结束日期']} />
      <Button type="primary">搜索</Button>
    </div>
  );
  return (
    <PageHeaderWrapper content={mainSearch}>
      <Card bordered={false}>
        <BarChart />
      </Card>
    </PageHeaderWrapper>
  );
};

export default ShelfUtilization;
