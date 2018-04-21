const LeagueTableView = function (container) {
  this.container = container;
}

LeagueTableView.prototype.renderTable = function (tableData) {
  this.container.innerHTML = ''
  const table = document.createElement('table');
  this.container.appendChild(table);

  const headings = document.createElement('tr');
  table.appendChild(headings);

  createTableHeading("Standing", headings);
  createTableHeading("Team Name", headings);
  createTableHeading("Played", headings);
  createTableHeading("Won", headings);
  createTableHeading("Drawn", headings);
  createTableHeading("Lost", headings);
  createTableHeading("+/-", headings);
  createTableHeading("Points", headings);

  tableData.standing.forEach((team) => {
    const row = document.createElement('tr');
    table.appendChild(row);

    createTableData(team.position, row);
    createTableData(team.teamName, row);
    createTableData(team.playedGames, row);
    createTableData(team.wins, row);
    createTableData(team.draws, row);
    createTableData(team.losses, row);
    createTableData(team.goalDifference, row);
    createTableData(team.points, row);
  });
};

const createTableHeading = function (headingName, headingsRow) {
  const heading = document.createElement('th');
  heading.textContent = headingName;
  headingsRow.appendChild(heading);
}

const createTableData = function (data, row) {
  const tableData = document.createElement('td');
  tableData.textContent = data;
  row.appendChild(tableData);
}

module.exports = LeagueTableView;
