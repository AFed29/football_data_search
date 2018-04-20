const TeamView = function (container) {
  this.container = container;
}

TeamView.prototype.renderList = function (teamData) {
  this.container.innerHTML = ''
  teamData.teams.forEach((team) => {
    const teamDataList = document.createElement('ul');
    this.container.appendChild(teamDataList);

    const teamName = document.createElement('li');
    teamName.textContent = team.name;
    teamDataList.appendChild(teamName);

    const teamNickname = document.createElement('li');
    teamNickname.textContent = team.shortName;
    teamDataList.appendChild(teamNickname);

    if (team.crestUrl !== null) {
      const teamCrest = document.createElement('img');
      teamCrest.src = team.crestUrl;
      teamCrest.alt = `${team.name}'s Crest`
      teamDataList.appendChild(teamCrest);
    }
  })
};

module.exports = TeamView;
