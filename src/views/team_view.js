const TeamView = function (container) {
  this.container = container;
}

TeamView.prototype.renderList = function (teamData) {
  this.container.innerHTML = ''
  teamData.teams.forEach((team) => {
    const teamDataList = document.createElement('ul');
    this.container.appendChild(teamDataList);

    createListItem(team.name, teamDataList);
    createListItem(team.shortName, teamDataList);

    if (team.crestUrl !== null) {
      const teamCrest = document.createElement('img');
      teamCrest.src = team.crestUrl;
      teamCrest.alt = `${team.name}'s Crest`
      teamDataList.appendChild(teamCrest);
    }
  })
};

const createListItem = function (data, parentList) {
  const listItem = document.createElement('li');
  listItem.textContent = data;
  parentList.appendChild(listItem);
}

module.exports = TeamView;
