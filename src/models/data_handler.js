const Request = require('../helpers/request.js');

const DataHandler = function () {
  this.url = null;
  this.data = null;
}

DataHandler.prototype.getData = function (competitionID, searchTerm, onComplete) {
  this.url = `https://api.football-data.org/v1/competitions/${competitionID}/${searchTerm}`;
  const request = new Request(this.url);
  request.get((data) => {
    this.data = data;
    onComplete(data);
  })
};

module.exports = DataHandler;
