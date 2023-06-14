// Change date into YYYY-MM-DD format
module.exports.formatDate = function formatDate(datetime) {
  // Get Date, month, and year from parameter
  const date = ('0' + datetime.getDate()).slice(-2);
  const month = ('0' + (datetime.getMonth() + 1)).slice(-2);
  const year = datetime.getFullYear();

  return year + '-' + month + '-' + date;
};
