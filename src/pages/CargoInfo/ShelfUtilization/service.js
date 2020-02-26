import request from '@/utils/request';

export async function queryData({ begin, end }) {
  const data = await request('/api/sinoapi/exportshelfutilization', {
    params: {
      begin,
      end,
    },
  });
  return data;
}
