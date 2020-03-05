import moment from 'moment';

export default {
  tableTitle: false,
  headerTitle: false,
  dayDefaultDate: [moment().startOf('day'), moment().endOf('day')],
  monthDefaultDate: [moment().startOf('month'), moment().endOf('month')],
  yearDefaultDate: [moment().startOf('year'), moment().endOf('year')],
};
