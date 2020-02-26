import React from 'react';
import { DatePicker, Button, Card } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import BarChart from './components/BarChart';

const { RangePicker } = DatePicker;

const ShelfUtilization = props => {
  const { dispatch, data } = props;

  const onSearch = () => {
    if (dispatch) {
      dispatch({
        type: 'shelfUtilization/fetchChartData',
        payload: {
          begin: '2020-01-01',
          end: '2020-01-01',
        },
      });
    }
  };

  const mainSearch = (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <RangePicker format="YYYY-MM-DD" placeholder={['开始日期', '结束日期']} />
      <Button type="primary" onClick={onSearch}>
        搜索
      </Button>
    </div>
  );
  return (
    <PageHeaderWrapper content={mainSearch}>
      <Card bordered={false}>
        <BarChart data={data} />
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ shelfUtilization: { data } }) => ({ data }))(ShelfUtilization);
