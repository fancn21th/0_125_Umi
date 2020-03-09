import request from '@/utils/request';
import { dataTransformAccount } from './utils/dataTransformAccount';
import { dataTransformRoles } from './utils/dataTransformRoles';
import { genAsyncSearch } from '@/utils/search/searchInCurPage';

async function queryCargos2({ current, pageSize }) {
  const data = await request('/api/userManager/users', {
    params: {
      pageNum: current,
      pageSize,
    },
  });
  return dataTransformAccount(data);
}
export const queryCargos = genAsyncSearch(queryCargos2, 'roleName');

export async function queryRoles({ pageNum, pageSize }) {
  const data = await request('/api/userManager/roles', {
    params: {
      pageNum,
      pageSize,
    },
  });
  return dataTransformRoles(data);
}

export async function remove({ id }) {
  return request(`/api/userManager/user/${id}`, {
    method: 'DELETE',
  });
}

export async function add({
  username,
  realname,
  phone = '',
  roleId,
  email,
  password,
  confirmPassword,
}) {
  return request('/api/userManager/user', {
    method: 'POST',
    data: {
      username,
      realname,
      phone,
      roleId,
      email,
      password,
      confirmPassword,
    },
  });
}
export async function update({ id, realname, phone, roleId, email }) {
  return request(`/api/userManager/user/${id}`, {
    method: 'PUT',
    data: { realname, phone, email, roleId },
  });
}

export async function updatePassword({ id, password = '', confirmPassword = '' }) {
  if (password && confirmPassword) {
    return request(`/api/userManager/user/${id}/password`, {
      method: 'PUT',
      data: { password, confirmPassword },
    });
  }
  return null;
}
