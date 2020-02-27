import request from '@/utils/request';

// 人员
// /api/report/emailSetting?type=DAY_REPORT
// /api/report/emailSetting/1

// /api/report/emailSetting?type=MONTH_REPORT
// /api/report/emailSetting/2

// /api/report/emailSetting?type=YEAR_REPORT
// /api/report/emailSetting/3

// 叉车
// /api/report/emailSetting?type=DEV_WORKLOAD_DAY_REPORT
// /api/report/emailSetting/6

// /api/report/emailSetting?type=DEV_WORKLOAD_MONTH_REPORT
// /api/report/emailSetting/7

// /api/report/emailSetting?type=DEV_WORKLOAD_YEAR_REPORT
// /api/report/emailSetting/8

// 货物破损
// /api/report/emailSetting?type=CARGO_BROKEN_REPORT
// /api/report/emailSetting/5

// 货物状态
// /api/report/emailSetting?type=CARGO_STATUS_REPORT
// /api/report/emailSetting/4

const typeMappingTable = {
  human: {
    day: 'DAY_REPORT',
    month: 'MONTH_REPORT',
    year: 'YEAR_REPORT',
  },
  machine: {
    day: 'DEV_WORKLOAD_DAY_REPORT',
    month: 'DEV_WORKLOAD_MONTH_REPORT',
    year: 'DEV_WORKLOAD_YEAR_REPORT',
  },
  broken: {
    day: 'CARGO_BROKEN_REPORT',
  },
  status: {
    day: 'CARGO_STATUS_REPORT',
  },
};

const updateMappingTable = {
  human: {
    day: '1',
    month: '2',
    year: '3',
  },
  machine: {
    day: '6',
    month: '7',
    year: '8',
  },
  broken: {
    day: '5',
  },
  status: {
    day: '4',
  },
};

export async function queryEmailSetting({ category, mode = 'day' }) {
  return request('/api/report/emailSetting', {
    params: { type: typeMappingTable[category][mode] },
  });
}

export async function updateEmailSetting({ category, mode = 'day', data }) {
  return request(`/api/report/emailSetting/${updateMappingTable[category][mode]}`, {
    method: 'PUT',
    data,
  });
}
