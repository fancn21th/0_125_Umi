import request from '@/utils/request';

export async function queryRecipients() {
  return request('/api/report/recipients', {
    params: {
      pageNum: 1,
      pageSize: 10,
    },
  });
}
