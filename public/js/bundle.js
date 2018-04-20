/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const CompetitionData = __webpack_require__(/*! ./models/competition_data.js */ \"./src/models/competition_data.js\");\nconst DataHandler = __webpack_require__(/*! ./models/data_handler.js */ \"./src/models/data_handler.js\");\nconst CompetitionView = __webpack_require__(/*! ./views/competition_view.js */ \"./src/views/competition_view.js\");\nconst TeamView = __webpack_require__(/*! ./views/team_view.js */ \"./src/views/team_view.js\");\nconst LeagueTableView = __webpack_require__(/*! ./views/league_table_view.js */ \"./src/views/league_table_view.js\");\n\nlet teamView = null;\nlet leagueTableView = null;\n\ndocument.addEventListener('DOMContentLoaded', () => {\n\n  let competitionID = null;\n  let searchTerm = null;\n\n  const competitionSelect = document.querySelector('#competition-select');\n\n  const searchSelect = document.querySelector('#search-select');\n\n  const dataDiv = document.querySelector('#data-div');\n\n  const competitionView = new CompetitionView(competitionSelect);\n  teamView = new TeamView(dataDiv);\n  leagueTableView = new LeagueTableView(dataDiv);\n\n  const competitionData = new CompetitionData();\n  const dataHandler = new DataHandler();\n\n  competitionData.getData((data) => {\n    competitionView.renderSelect(data);\n  });\n\n\n  competitionSelect.addEventListener('change', (event) => {\n    competitionID = event.target.value;\n    renderDataWhenSelected(competitionID, searchTerm, dataHandler);\n  })\n\n  searchSelect.addEventListener('change', (event) => {\n    searchTerm = event.target.value;\n    renderDataWhenSelected(competitionID, searchTerm, dataHandler);\n  });\n});\n\nconst renderDataWhenSelected = function (competitionID, searchTerm, dataHandler) {\n  if (competitionID !== null && searchTerm !== null) {\n    switch (searchTerm) {\n      case 'teams':\n        dataHandler.getData(competitionID, searchTerm, (data) => {\n          teamView.renderList(data)\n        });\n        break;\n      case 'leagueTable':\n        dataHandler.getData(competitionID, searchTerm, (data) => {\n          leagueTableView.renderTable(data)\n        });\n        break;\n      default:\n\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/helpers/request.js":
/*!********************************!*\
  !*** ./src/helpers/request.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Request = function(url) {\n  this.url = url;\n};\n\nRequest.prototype.get = function(onComplete) {\n  const request = new XMLHttpRequest();\n  request.open('GET', this.url);\n  request.setRequestHeader(\"X-Auth-Token\", 'b7e21c920c9b4df59d1b43059033d36c')\n  request.addEventListener('load', function() {\n    if(this.status !== 200) {\n      return;\n    }\n\n    const responseBody = JSON.parse(this.responseText);\n    onComplete(responseBody);\n  });\n  request.send();\n};\n\nmodule.exports = Request;\n\n\n//# sourceURL=webpack:///./src/helpers/request.js?");

/***/ }),

/***/ "./src/models/competition_data.js":
/*!****************************************!*\
  !*** ./src/models/competition_data.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Request = __webpack_require__(/*! ../helpers/request.js */ \"./src/helpers/request.js\");\n\nconst CompetitionData = function () {\n  this.url = 'https://api.football-data.org/v1/competitions'\n  this.data = null;\n}\n\nCompetitionData.prototype.getData = function (onComplete) {\n  const request = new Request(this.url);\n  request.get((data) => {\n    this.data = data;\n    onComplete(data);\n  })\n};\n\nmodule.exports = CompetitionData;\n\n\n//# sourceURL=webpack:///./src/models/competition_data.js?");

/***/ }),

/***/ "./src/models/data_handler.js":
/*!************************************!*\
  !*** ./src/models/data_handler.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Request = __webpack_require__(/*! ../helpers/request.js */ \"./src/helpers/request.js\");\n\nconst DataHandler = function () {\n  this.url = null;\n  this.data = null;\n}\n\nDataHandler.prototype.getData = function (competitionID, searchTerm, onComplete) {\n  this.url = `https://api.football-data.org/v1/competitions/${competitionID}/${searchTerm}`;\n  const request = new Request(this.url);\n  request.get((data) => {\n    this.data = data;\n    onComplete(data);\n  })\n};\n\nmodule.exports = DataHandler;\n\n\n//# sourceURL=webpack:///./src/models/data_handler.js?");

/***/ }),

/***/ "./src/views/competition_view.js":
/*!***************************************!*\
  !*** ./src/views/competition_view.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const CompetitionView =  function (selectElement) {\n  this.selectElement = selectElement;\n}\n\nCompetitionView.prototype.renderSelect = function (competitionData) {\n  competitionData.forEach((competition) => {\n    const competitionOption = document.createElement('option')\n    competitionOption.textContent = competition.caption;\n    competitionOption.value = competition.id;\n    this.selectElement.appendChild(competitionOption);\n  })\n};\n\nmodule.exports = CompetitionView;\n\n\n//# sourceURL=webpack:///./src/views/competition_view.js?");

/***/ }),

/***/ "./src/views/league_table_view.js":
/*!****************************************!*\
  !*** ./src/views/league_table_view.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const LeagueTableView = function (container) {\n  this.container = container;\n}\n\nLeagueTableView.prototype.renderTable = function (tableData) {\n  this.container.innerHTML = ''\n  const table = document.createElement('table');\n  this.container.appendChild(table);\n\n  const headings = document.createElement('tr');\n  table.appendChild(headings);\n\n  const standingHeading = document.createElement('th');\n  standingHeading.textContent = \"Standing\";\n  headings.appendChild(standingHeading);\n\n  const teamNameHeading = document.createElement('th');\n  teamNameHeading.textContent = \"Team Name\";\n  headings.appendChild(teamNameHeading);\n\n  const gamesPlayedHeading = document.createElement('th');\n  gamesPlayedHeading.textContent = \"Played\";\n  headings.appendChild(gamesPlayedHeading);\n\n  const gamesWonHeading = document.createElement('th');\n  gamesWonHeading.textContent = \"Won\";\n  headings.appendChild(gamesWonHeading);\n\n  const gamesDrawnHeading = document.createElement('th');\n  gamesDrawnHeading.textContent = \"Drawn\";\n  headings.appendChild(gamesDrawnHeading);\n\n  const gamesLostHeading = document.createElement('th');\n  gamesLostHeading.textContent = \"Lost\";\n  headings.appendChild(gamesLostHeading);\n\n  const goalDifferenceHeading = document.createElement('th');\n  goalDifferenceHeading.textContent = \"Goal Difference\";\n  headings.appendChild(goalDifferenceHeading);\n\n  const pointsHeading = document.createElement('th');\n  pointsHeading.textContent = \"Points\";\n  headings.appendChild(pointsHeading);\n\nconsole.log(tableData);\n\n  tableData.standing.forEach((team) => {\n    const row = document.createElement('tr');\n    table.appendChild(row);\n\n    const standing = document.createElement('td');\n    standing.textContent = team.position;\n    row.appendChild(standing);\n\n    const teamName = document.createElement('td');\n    teamName.textContent = team.teamName;\n    row.appendChild(teamName);\n\n    const gamesPlayed = document.createElement('td');\n    gamesPlayed.textContent = team.playedGames;\n    row.appendChild(gamesPlayed);\n\n    const gamesWon = document.createElement('td');\n    gamesWon.textContent = team.wins;\n    row.appendChild(gamesWon);\n\n    const gamesDrawn = document.createElement('td');\n    gamesDrawn.textContent = team.draws;\n    row.appendChild(gamesDrawn);\n\n    const gamesLost = document.createElement('td');\n    gamesLost.textContent = team.losses;\n    row.appendChild(gamesLost);\n\n    const goalDifference = document.createElement('td');\n    goalDifference.textContent = team.goalDifference;\n    row.appendChild(goalDifference);\n\n    const points = document.createElement('td');\n    points.textContent = team.points;\n    row.appendChild(points);\n\n  })\n\n\n\n};\n\nmodule.exports = LeagueTableView;\n\n\n//# sourceURL=webpack:///./src/views/league_table_view.js?");

/***/ }),

/***/ "./src/views/team_view.js":
/*!********************************!*\
  !*** ./src/views/team_view.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const TeamView = function (container) {\n  this.container = container;\n}\n\nTeamView.prototype.renderList = function (teamData) {\n  this.container.innerHTML = ''\n  teamData.teams.forEach((team) => {\n    const teamDataList = document.createElement('ul');\n    this.container.appendChild(teamDataList);\n\n    const teamName = document.createElement('li');\n    teamName.textContent = team.name;\n    teamDataList.appendChild(teamName);\n\n    const teamNickname = document.createElement('li');\n    teamNickname.textContent = team.shortName;\n    teamDataList.appendChild(teamNickname);\n\n    if (team.crestUrl !== null) {\n      const teamCrest = document.createElement('img');\n      teamCrest.src = team.crestUrl;\n      teamCrest.alt = `${team.name}'s Crest`\n      teamDataList.appendChild(teamCrest);\n    }\n  })\n};\n\nmodule.exports = TeamView;\n\n\n//# sourceURL=webpack:///./src/views/team_view.js?");

/***/ })

/******/ });