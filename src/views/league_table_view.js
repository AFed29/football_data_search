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

  debugger;

  tableData.standings[0].table.forEach((standing) => {
    const row = document.createElement('tr');
    table.appendChild(row);

    createTableData(standing.position, row);
    createTableData(standing.team.name, row);
    createTableData(standing.playedGames, row);
    createTableData(standing.won, row);
    createTableData(standing.draw, row);
    createTableData(standing.lost, row);
    createTableData(standing.goalDifference, row);
    createTableData(standing.points, row);
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
