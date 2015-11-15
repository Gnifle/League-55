function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	}
	return "";
}

function setRegionSelect(region) {
	var dd = document.getElementById('summonerRegion');
	for (var i = 0; i < dd.options.length; i++) {
		if (dd.options[i].value === region) {
			dd.selectedIndex = i;
			break;
		}
	}
}

var formHelpers = {

	clearInputForm: function() {
		$('#summonerName').blur();
		$('#summonerTeamList').empty();
	},

	loading: function(isLoading) {
		if(isLoading) {
			$('#summoner-form-search').addClass('searchActive');
			$('#summonerTeamList').removeClass('listVisible');
		} else {
			setTimeout(function () {
				$('#summoner-form-search').removeClass('searchActive');
				$('#summonerTeamList').addClass('listVisible');
			}, 1000);
		}
	},

	appendTeam: function(team, region) {
		$('#summonerTeamList').append(
			$('<a href="teams/' + region + '/' + team.tag.toLowerCase() + '"><li><span>' + team.tag + '</span><span>' + team.name + '</span></li></a>')
		);
	},

	appendNotice: function(type, notice) {
		$('#summonerTeamList').append(
			$('<a><li class="result-' + type + '">' + notice + '</li></a>')
		);
	},

	handleError: function(error) {
		switch(error.status) {
			case 0:
				formHelpers.appendNotice('error', 'Internet disconnected!');
				break;
			case 404:
				formHelpers.appendNotice('info', 'No summoner with this name!');
				break;
			case 429:
				formHelpers.appendNotice('error', 'Rate limit exceeded - try again in a few seconds!');
				break;
			case 500:
				formHelpers.appendNotice('info', 'Problem with Riot\'s API server');
				break;
			case 503:
				formHelpers.appendNotice('info', 'Riot API server maintenance');
				break;
			default:
				formHelpers.appendNotice('error', 'An unknown error occurred!');
		}
	}
};

var statsHelpers = {

	getRegion: function() {
		return 'euw';
	},

	/**
	 * Filters non-duplicates from an array, also
	 * removing excess duplicates afterwards for a
	 * array with all unique values
	 * @param array The array to be filtered
	 * @returns {Array}
	 */
	filterNonDuplicates: function(array) {
		var o = {},
			a = [];
		array.forEach(function(item) {
			if(item in o) {
				o[item] = o[item] + 1;
			} else {
				o[item] = 1;
			}
		});
		for(var key in o) {
			if(o[key] > 1) {
				a.push(parseInt(key));
			}
		}
		return a;
	},

	/**
	 * Logs stat with value for summonerId
	 * @param stat Stat key to be recorded
	 * @param value Stat value to be recorded
	 * @param summonerId ID for player to record to
	 */
	logPlayerStat: function(stat, value, summonerId) {
		if(stats.playerStats[summonerId] === undefined) {
			stats.playerStats[summonerId] = {};
		}
		if(stat in stats.playerStats[summonerId]) {
			stats.playerStats[summonerId][stat] += value;
		} else {
			stats.playerStats[summonerId][stat] = value;
		}
	},

	updatePlayerStat: function(stat, value, summonerId) {
		if(stats.playerStats[summonerId] === undefined) {
			stats.playerStats[summonerId] = {};
		}
		stats.playerStats[summonerId][stat] = value;
	},

	logLargestPlayerStat: function(stat, value, summonerId) {
		if(stats.playerStats[summonerId] === undefined) {
			stats.playerStats[summonerId] = {};
		}
		if(stat in stats.playerStats[summonerId]) {
			if(stats.playerStats[summonerId[stat] <= value]) {
				stats.playerStats[summonerId[stat]] = value;
			}
		} else {
			stats.playerStats[summonerId][stat] = value;
		}
	},

	logPlayerStatFlow: function(stat, value, summonerId) {
		if(stats.playerStats[summonerId] === undefined) {
			stats.playerStats[summonerId] = {};
		}
		if(stat in stats.playerStats[summonerId]) {
			var statFlow = stats.playerStats[summonerId][stat];
			statFlow.push(value);
			stats.playerStats[summonerId][stat] = statFlow;
		} else {
			statFlow = [];
			statFlow.push(value);
			stats.playerStats[summonerId][stat] = statFlow;
		}
	},

	logTeamStat: function(stat, value) {
		if(stat in stats.teamStats) {
			stats.teamStats[stat] += value;
		} else {
			stats.teamStats[stat] = value;
		}
	}
}