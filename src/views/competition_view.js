const CompetitionView =  function (selectElement) {
  this.selectElement = selectElement;
}

CompetitionView.prototype.renderSelect = function (competitionData) {
  competitionData.competitions.forEach((competition) => {
    const competitionOption = document.createElement('option')
    competitionOption.textContent = competition.name;
    competitionOption.value = competition.id;
    this.selectElement.appendChild(competitionOption);
  })
};

module.exports = CompetitionView;
