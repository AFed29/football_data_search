const PrettyDate = function () {}

PrettyDate.prototype.format = function (dateString) {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

module.exports = PrettyDate;
