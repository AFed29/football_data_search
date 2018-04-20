const Request = require('../helpers/request.js');

const CompetitionData = function () {
  this.url = 'https://api.football-data.org/v1/competitions'
  this.data = null;
}

CompetitionData.prototype.getData = function (onComplete) {
  const request = new Request(this.url);
  request.get((data) => {
    this.data = data;
    onComplete(data);
  })
};

module.exports = CompetitionData;
