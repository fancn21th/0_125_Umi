import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function queryEmailSendConfig() {
  return request('/api/report/emailSendConfig');
}
