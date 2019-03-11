const PrettyDate = require('../helpers/pretty_date.js');

const FixtureView = function (selectContainer, dataContainer) {
  this.selectContainer = selectContainer;
  this.dataContainer = dataContainer;
  this.data = null;
}

FixtureView.prototype.renderSelect = function (data) {
  this.selectContainer.innerHTML = '';
  this.data = data;
  const fixtureSelect = document.createElement('select');
  fixtureSelect.id = 'fixture-select';
  this.selectContainer.appendChild(fixtureSelect);

  const placeholder = document.createElement('option');
  placeholder.textContent = 'Please Select Which Fixtures';
  placeholder.disabled = true;
  placeholder.selected = true;
  fixtureSelect.appendChild(placeholder);

  const results = document.createElement('option');
  results.textContent = 'Results';
  fixtureSelect.appendChild(results);

  const futureFixtures = document.createElement('option');
  futureFixtures.textContent = 'Future Fixtures';
  fixtureSelect.appendChild(futureFixtures);

  return fixtureSelect;
};

FixtureView.prototype.renderList = function (fixtureType) {
  const prettyDate = new PrettyDate();
  this.dataContainer.innerHTML = ''
  this.dataContainer
  const fixtures = getFixtures(this.data, fixtureType);
  fixtures.forEach((fixture) => {
      const fixtureDataList = document.createElement('ul');
      this.dataContainer.appendChild(fixtureDataList);
      debugger;

      createListItem(prettyDate.format(fixture.utcDate), fixtureDataList);
      createListItem(`${fixture.homeTeam.name} vs ${fixture.awayTeam.name}`, fixtureDataList);
      if (fixture.score.fullTime.homeTeam !== null && fixture.score.fullTime.awayTeam !== null) {
        createListItem(`${fixture.score.fullTime.homeTeam} - ${fixture.score.fullTime.awayTeam}`, fixtureDataList);
      }
  })
};

FixtureView.prototype.removeSelect = function () {
  this.selectContainer.innerHTML ='';
};


const createListItem = function (data, parentList) {
  const listItem = document.createElement('li');
  listItem.textContent = data;
  parentList.appendChild(listItem);
}

const getFixtures = function (data, fixtureType) {
  let fixtures = null;
  if (fixtureType === 'Results') {
    fixtures = data.matches.filter((fixture) => {
      return (fixture.status === 'FINISHED');
    })
    fixtures.reverse();
  } else {
    fixtures = data.matches.filter((fixture) => {
      return (fixture.status !== 'FINISHED' && fixture.status !== 'POSTPONED');
    })
  }
  return fixtures;
}
module.exports = FixtureView;
