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
  const fixtures = getFixtures(this.data, fixtureType);
  console.log(fixtures);
  fixtures.forEach((fixture) => {
      const fixtureDataList = document.createElement('ul');
      this.dataContainer.appendChild(fixtureDataList);

      createListItem(prettyDate.format(fixture.date), fixtureDataList);
      createListItem(`${fixture.homeTeamName} vs ${fixture.awayTeamName}`, fixtureDataList);
      if (fixture.result.goalsHomeTeam !== null && fixture.result.goalsAwayTeam !== null) {
        createListItem(`${fixture.result.goalsHomeTeam} - ${fixture.result.goalsAwayTeam}`, fixtureDataList);
      }
  })
};


const createListItem = function (data, parentList) {
  const listItem = document.createElement('li');
  listItem.textContent = data;
  parentList.appendChild(listItem);
}

const getFixtures = function (data, fixtureType) {
  let fixtures = null;
  if (fixtureType === 'Results') {
    fixtures = data.fixtures.filter((fixture) => {
      return (fixture.status === 'FINISHED');
    })
    fixtures.reverse();
  } else {
    fixtures = data.fixtures.filter((fixture) => {
      return (fixture.status !== 'FINISHED' && fixture.status !== 'POSTPONED');
    })
  }
  return fixtures;
}
module.exports = FixtureView;
