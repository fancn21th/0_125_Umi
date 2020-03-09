import React, { useState } from 'react';
import { DatePicker, Button, Card, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import BarChart from './components/BarChart';
import config from './config/config';
const { headerTitle, defaultDate } = config;

const { RangePicker } = DatePicker;

const ShelfUtilization = props => {
  const { dispatch, data } = props;
  const [dateSpan, setDateSpan] = useState(defaultDate);
  const [dateSpanArray, setDateSpanArray] = useState([]);

  const onSearch = () => {
    if (dispatch) {
      if (dateSpanArray.length === 0) {
        message.error('请选择开始日期与结束日期');
        return;
      }
      dispatch({
        type: 'shelfUtilization/fetchChartData',
        payload: {
          begin: dateSpanArray[0],
          end: dateSpanArray[1],
        },
      });
    }
  };

  const onRangePickerChange = (dates, datesStringArray) => {
    setDateSpan(dates);
    setDateSpanArray(datesStringArray);
  };

  const mainSearch = (
    <div className="dc-headerContent-wrapper">
      <RangePicker
        defaultValue={defaultDate}
        value={dateSpan}
        onChange={onRangePickerChange}
        format="YYYY-MM-DD"
        placeholder={['开始日期', '结束日期']}
      />
      <Button type="primary" onClick={onSearch}>
        搜索
      </Button>
    </div>
  );
  return (
    <PageHeaderWrapper title={headerTitle} content={mainSearch}>
      <Card bordered={false}>
        <BarChart data={data} />
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ shelfUtilization: { data } }) => ({ data }))(ShelfUtilization);
