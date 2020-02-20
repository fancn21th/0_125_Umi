export default (...args) => arg => {
  return args.reduce((acc, val) => val(acc), arg);
};
