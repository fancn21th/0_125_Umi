import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent({ id }) {
  // return request('/api/currentUser');
  return request(`/api/userManager/user/${id}`);
}

export async function queryNotices() {
  return request('/api/notices');
}
