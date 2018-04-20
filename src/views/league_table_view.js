const LeagueTableView = function (container) {
  this.container = container;
}

LeagueTableView.prototype.renderTable = function (tableData) {
  this.container.innerHTML = ''
  const table = document.createElement('table');
  this.container.appendChild(table);

  const headings = document.createElement('tr');
  table.appendChild(headings);

  const standingHeading = document.createElement('th');
  standingHeading.textContent = "Standing";
  headings.appendChild(standingHeading);

  const teamNameHeading = document.createElement('th');
  teamNameHeading.textContent = "Team Name";
  headings.appendChild(teamNameHeading);

  const gamesPlayedHeading = document.createElement('th');
  gamesPlayedHeading.textContent = "Played";
  headings.appendChild(gamesPlayedHeading);

  const gamesWonHeading = document.createElement('th');
  gamesWonHeading.textContent = "Won";
  headings.appendChild(gamesWonHeading);

  const gamesDrawnHeading = document.createElement('th');
  gamesDrawnHeading.textContent = "Drawn";
  headings.appendChild(gamesDrawnHeading);

  const gamesLostHeading = document.createElement('th');
  gamesLostHeading.textContent = "Lost";
  headings.appendChild(gamesLostHeading);

  const goalDifferenceHeading = document.createElement('th');
  goalDifferenceHeading.textContent = "Goal Difference";
  headings.appendChild(goalDifferenceHeading);

  const pointsHeading = document.createElement('th');
  pointsHeading.textContent = "Points";
  headings.appendChild(pointsHeading);

console.log(tableData);

  tableData.standing.forEach((team) => {
    const row = document.createElement('tr');
    table.appendChild(row);

    const standing = document.createElement('td');
    standing.textContent = team.position;
    row.appendChild(standing);

    const teamName = document.createElement('td');
    teamName.textContent = team.teamName;
    row.appendChild(teamName);

    const gamesPlayed = document.createElement('td');
    gamesPlayed.textContent = team.playedGames;
    row.appendChild(gamesPlayed);

    const gamesWon = document.createElement('td');
    gamesWon.textContent = team.wins;
    row.appendChild(gamesWon);

    const gamesDrawn = document.createElement('td');
    gamesDrawn.textContent = team.draws;
    row.appendChild(gamesDrawn);

    const gamesLost = document.createElement('td');
    gamesLost.textContent = team.losses;
    row.appendChild(gamesLost);

    const goalDifference = document.createElement('td');
    goalDifference.textContent = team.goalDifference;
    row.appendChild(goalDifference);

    const points = document.createElement('td');
    points.textContent = team.points;
    row.appendChild(points);

  })



};

module.exports = LeagueTableView;
