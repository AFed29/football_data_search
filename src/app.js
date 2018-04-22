const CompetitionData = require('./models/competition_data.js');
const DataHandler = require('./models/data_handler.js');
const CompetitionView = require('./views/competition_view.js');
const TeamView = require('./views/team_view.js');
const LeagueTableView = require('./views/league_table_view.js');
const FixtureView = require('./views/fixture_view.js');

let teamView = null;
let leagueTableView = null;
let fixtureView = null;

document.addEventListener('DOMContentLoaded', () => {

  let competitionID = null;
  let searchTerm = null;

  const selectDiv = document.querySelector('#select-div');
  const competitionSelect = document.querySelector('#competition-select');
  const searchSelect = document.querySelector('#search-select');
  const dataDiv = document.querySelector('#data-div');

  const competitionView = new CompetitionView(competitionSelect);
  teamView = new TeamView(dataDiv);
  leagueTableView = new LeagueTableView(dataDiv);
  fixtureView = new FixtureView(selectDiv, dataDiv);

  const competitionData = new CompetitionData();
  const dataHandler = new DataHandler();

  competitionData.getData((data) => {
    competitionView.renderSelect(data);
  });


  competitionSelect.addEventListener('change', (event) => {
    competitionID = event.target.value;
    renderDataWhenSelected(competitionID, searchTerm, dataHandler);
  })

  searchSelect.addEventListener('change', (event) => {
    searchTerm = event.target.value;
    renderDataWhenSelected(competitionID, searchTerm, dataHandler);
  });
});

const renderDataWhenSelected = function (competitionID, searchTerm, dataHandler) {
  if (competitionID !== null && searchTerm !== null) {
    switch (searchTerm) {
      case 'teams':
        dataHandler.getData(competitionID, searchTerm, (data) => {
          teamView.renderList(data)
        });
        break;
      case 'leagueTable':
        dataHandler.getData(competitionID, searchTerm, (data) => {
          leagueTableView.renderTable(data)
        });
        break;
      case 'fixtures':
        dataHandler.getData(competitionID, searchTerm, (data) => {
            const fixtureSelect = fixtureView.renderSelect(data);
          fixtureSelect.addEventListener('change', (event) => {
            fixtureView.renderList(event.target.value);
          });
        })
        break;
      default:

    }
  }
}
