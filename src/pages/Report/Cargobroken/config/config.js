import moment from 'moment';

export default {
  tableTitle: false,
  headerTitle: false,
  defaultDate: [moment().startOf('day'), moment().endOf('day')],
};
