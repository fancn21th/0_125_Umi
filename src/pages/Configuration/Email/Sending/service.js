import request from '@/utils/request';

// export async function fakeSubmitForm(params) {
//   return request('/api/forms', {
//     method: 'POST',
//     data: params,
//   });
// }

export async function addEmailSendConfig(params) {
  const { smtpFromUserName } = params;
  return request('/api/report/emailSendConf', {
    method: 'POST',
    data: { ...params, smtpUserName: smtpFromUserName },
  });
}

export async function queryEmailSendConfig() {
  return request('/api/report/emailSendConfig');
}
