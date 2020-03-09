import moment from 'moment';

export default {
  headerTitle: false,
  defaultDate: [moment().startOf('day'), moment().endOf('day')],
};
