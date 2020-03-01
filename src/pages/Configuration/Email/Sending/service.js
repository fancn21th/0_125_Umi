import request from '@/utils/request';

export async function updateEmailSendConfig(params) {
  const { smtpFromUserName } = params;
  return request('/api/report/emailSendConfig', {
    method: 'PUT',
    data: { ...params, smtpUserName: smtpFromUserName },
  });
}

export async function queryEmailSendConfig() {
  return request('/api/report/emailSendConfig');
}
