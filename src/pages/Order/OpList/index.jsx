import { Button, message, Input, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import LogModal from './components/LogModal';
import {
  queryOpList,
  queryUploadResultByInorder,
  queryUploadResult,
  updateStatus,
} from './service';
import { columns } from './config/col-config-op';
import { columns as logColumns } from './config/col-config-log';
import config from './config/config';
import styles from './index.css';
const { tableTitle, headerTitle } = config;
const { Search } = Input;
const { Text } = Typography;
let localAction = null;
const validate = ono => {
  const reg = /^(IN|WV|OU)[_a-zA-Z0-9]+/g;
  return ono !== '' && reg.test(ono);
};

const transformDatetime = (data, col) => {
  return data.map(val => {
    return Object.keys(val).reduce((acc, cur) => {
      const v = val[cur];
      const config = col.filter(c => {
        const { dataIndex } = c;
        return dataIndex == cur;
      });
      let isNeedTransform = false;
      if (config.length) {
        const { valueType } = config[0];
        isNeedTransform = valueType === 'dateTime';
      }
      return {
        ...acc,
        [cur]: isNeedTransform ? moment(v).format('YYYY-MM-DD HH:mm:ss') : v,
      };
    }, {});
  });
};

const TableList = () => {
  const [keywordsValue, setKeywordsValue] = useState('');
  const [keywords, setKeywords] = useState('');
  const [ordernoValue, setOrdernoValue] = useState('');
  const [orderno, setOrderno] = useState('');
  const [isNeedQuery, setIsNeedQuery] = useState(false);
  const [logData, setLogData] = useState([]);
  const [logModalVisibility, setLogModalVisibility] = useState(false);
  const actionRef = useRef();

  const headerContent = (
    <div className="dc-headerContent-wrapper">
      <Text>单号：</Text>
      <Input
        className="dc-orderno-input-width"
        placeholder="请输入单号"
        value={ordernoValue}
        onChange={e => {
          setOrdernoValue(e.target.value);
        }}
      ></Input>
      <Button
        type="primary"
        onClick={() => {
          if (validate(ordernoValue)) {
            setKeywordsValue('');
            setKeywords('');
            localAction.resetPageIndex(1);
            setIsNeedQuery(true);
            setOrderno(ordernoValue);
          } else {
            message.warning('请输入合规单号，示例前缀：IN、WV、OU');
          }
        }}
      >
        查询
      </Button>
      <Button
        type="default"
        onClick={() => {
          setOrdernoValue('');
          setOrderno('');
          setKeywordsValue('');
          setKeywords('');
          setIsNeedQuery(false);
        }}
      >
        重置
      </Button>
      <Button
        type="primary"
        onClick={async () => {
          if (validate(ordernoValue)) {
            const hide = message.loading('正在查询...');
            try {
              const data = await queryUploadResultByInorder(ordernoValue);
              hide();
              await setLogData(transformDatetime(data, logColumns));
              if (data.length) {
                message.success('查询成功');
              } else {
                message.success('数据为空，请检查单号是否输入正确');
              }
              return setLogModalVisibility(true);
            } catch (error) {
              hide();
              message.error(`查询失败,原因：${error.message}`);
              return setLogModalVisibility(false);
            }
          } else {
            message.warning('请输入合规单号，示例前缀：IN、WV、OU');
          }
        }}
      >
        查询日志
      </Button>
    </div>
  );

  return (
    <PageHeaderWrapper title={headerTitle} content={headerContent}>
      <ProTable
        headerTitle={tableTitle}
        actionRef={actionRef}
        rowKey="key"
        search={false}
        scroll={{ x: '200%' }}
        options={{ fullScreen: false, reload: true, setting: true }}
        beforeSearchSubmit={params => {
          setKeywordsValue('');
          setKeywords('');
          return params;
        }}
        params={{ orderno, keywords }}
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
        request={params => {
          if (isNeedQuery) {
            return queryOpList(params);
          }
          return Promise.resolve({
            success: true,
            data: [],
            total: 0,
          });
        }}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 10,
          defaultCurrent: 1,
        }}
        columns={[
          ...columns,
          {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            fixed: 'right',
            width: 100,
            render: (text, row) => [
              <div className={styles.toolColum}>
                <a
                  onClick={async () => {
                    const hide = message.loading('正在查询...');
                    try {
                      const { OpSN: id } = row;
                      const data = await queryUploadResult(id);
                      hide();
                      message.success('查询成功');
                      await setLogData(transformDatetime(data, logColumns));
                      return setLogModalVisibility(true);
                    } catch (error) {
                      hide();
                      message.error(`查询失败,原因：${error.message}`);
                      return setLogModalVisibility(false);
                    }
                  }}
                >
                  查询日志
                </a>
                <a
                  onClick={async () => {
                    const hide = message.loading('正在同步...');
                    try {
                      const { OpSN: id } = row;
                      await updateStatus(id, 0);
                      setKeywordsValue('');
                      setKeywords('');
                      localAction.resetPageIndex(1);
                      setIsNeedQuery(true);
                      setOrderno(ordernoValue);
                      actionRef.current.reload();
                      hide();
                      message.success('同步成功');
                    } catch (error) {
                      hide();
                      message.error('同步失败');
                    }
                  }}
                >
                  强制同步
                </a>
                <a
                  onClick={async () => {
                    const hide = message.loading('正在同步...');
                    try {
                      const { OpSN: id } = row;
                      await updateStatus(id, 1);
                      setKeywordsValue('');
                      setKeywords('');
                      localAction.resetPageIndex(1);
                      setIsNeedQuery(true);
                      setOrderno(ordernoValue);
                      actionRef.current.reload();
                      hide();
                      message.success('同步成功');
                    } catch (error) {
                      hide();
                      message.error('同步失败');
                    }
                  }}
                >
                  同步成功
                </a>
              </div>,
            ],
          },
        ]}
      />
      <LogModal
        columns={logColumns}
        logData={logData}
        modalVisible={logModalVisibility}
        title="上传日志"
        onCancel={() => setLogModalVisibility(false)}
      ></LogModal>
    </PageHeaderWrapper>
  );
};

export default TableList;
