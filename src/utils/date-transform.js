export function timetrans(ts) {
  var d = parseInt(ts);

  if (d.toString().length == 10) d *= 1000;

  if (d.toString().length < 10) return '';

  var date = new Date(d); //如果date为13位不需要乘1000
  var Y = date.getFullYear() + '-';

  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}

export function timetrans_sim(ts) {
  var d = parseInt(ts);

  if (d.toString().length == 10) d *= 1000;

  if (d.toString().length < 10) return '';
  var date = new Date(d); //如果date为13位不需要乘1000
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return M + D + h + m;
}
