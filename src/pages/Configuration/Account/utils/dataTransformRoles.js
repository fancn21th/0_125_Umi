import uuid from '@/utils/uuid';

export function dataTransformRoles(apidata) {
  const { data: apiarr } = apidata;
  return apiarr.map(item => ({ ...item, key: uuid() }));
}
