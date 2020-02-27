import request from '@/utils/request';

const typeMappingTable = {
  day: 'DAY_REPORT',
  month: 'MONTH_REPORT',
  year: 'YEAR_REPORT',
};

export async function queryEmailSetting({ mode }) {
  return request('/api/report/emailSetting', {
    params: { type: typeMappingTable[mode] },
  });
}
