var stats = {
	playerStats: {},
	teamStats: {
		championStats: {},
	}
}


/**
 * Returns all stats for a teams ranked games over the 2015 season
 */
var updateStats = function(currentTeamId) {
	var region = statsHelpers.getRegion(),
		//gnifleId = 29823543,
		teamId = currentTeamId,
		//teamMemberIds = [29823543, 25622346, 35260363, 20729856, 52337928, 46897122, 21760707, 19565972],
		//gameIds = [2329983164, 2329843790, 2329772348, 2289627260],
		team = {};
	$('table').DataTable({
		lengthMenu: [[10, 20, 50, 100, -1], [10, 20, 50, 100, "All"]],
		order: [[1, 'desc']],
		pageLength: 20
	});

	$.getJSON('https://' + region + '.api.pvp.net/api/lol/' + region + '/v2.4/team/' + teamId + '?api_key=' + APIkey, function(data) {
		data = data[teamId];
		team['name'] = data.name;
		team['tag'] = data.tag;
		team['region'] = region;
		team['id'] = data.fullId;
		team['owner'] = data.roster.ownerId;
		team['createDate'] = data.createDate;
		team['teamStats'] = data.teamStatDetails;
		team['matchHistoryDetails'] = data.matchHistory;
		team['matchHistory'] = [];
		team['rosterDetails'] = data.roster.memberList;
		team['roster'] = [];

		for(var member in team.rosterDetails) {
			//team.roster.push(data.roster.memberList[member].playerId);
			team.roster = [29823543, 25622346];
		}

	// Done getting initial team data -> Get complete match history
	}).done(function() {
		var rosterCount = 0;
	    team.roster.forEach(function(memberSummonerId) {

			$.getJSON('https://' + region + '.api.pvp.net/api/lol/' + region + '/v2.2/matchlist/by-summoner/' + memberSummonerId + '?rankedQueues=RANKED_TEAM_5x5&seasons=SEASON2015&api_key=' + APIkey, function(matchHistory) {
			    for(var match in matchHistory.matches) {
					//team.matchHistory.push(matchHistory.matches[match].matchId);
					team.matchHistory = [2329983164, 2329983164, 2329843790, 2329843790, 2329772348, 2329772348, 2329772349];
				}
				rosterCount++;

			// Done fetching all team member's games -> Ready to
			// analyse games and fetch stats
			}).done(function() {
				if(rosterCount == team.roster.length) {
					team.matchHistory = statsHelpers.filterNonDuplicates(team.matchHistory);
					var iteratedGamesCount = 0;

					team.matchHistory.forEach(function(matchId) {

						$.getJSON('https://' + region + '.api.pvp.net/api/lol/' + region + '/v2.2/match/' + matchId + '?api_key=' + APIkey, function(match) {
							var gameDurationSec = match.matchDuration,
								gameDurationMin = Math.round(gameDurationSec / 60 * 100) / 100;

							for(var i = 0; i < match.participantIdentities.length; i++) {
								var summonerId = match.participantIdentities[i].player.summonerId;
								var player = match.participants[i];

								if(team.roster.indexOf(summonerId) > -1) {

									var cs = player.stats.minionsKilled + player.stats.neutralMinionsKilled,
										champLevel = player.stats.champLevel,
										kills = player.stats.kills,
										deaths = player.stats.deaths,
										assists = player.stats.assists,
										doubleKills = player.stats.doubleKills,
										tripleKills = player.stats.tripleKills,
										quadraKills = player.stats.quadraKills,
										pentaKills = player.stats.pentaKills,
										goldEarned = player.stats.goldEarned,
										wardsPlaced = player.stats.wardsPlaced,
										damageDealt =  player.stats.totalDamageDealt,
										damageDealtToChampions =  player.stats.totalDamageDealtToChampions;

									statsHelpers.logPlayerStat('gamesPlayed', 1, summonerId);
									statsHelpers.logPlayerStat('champLevel', champLevel, summonerId);
									statsHelpers.logPlayerStat('timePlayedSec', gameDurationSec, summonerId);
									statsHelpers.logPlayerStat('timePlayedMin', gameDurationMin, summonerId);
									statsHelpers.logPlayerStat('csTotal', cs, summonerId);
									statsHelpers.logPlayerStat('kills', kills, summonerId);
									statsHelpers.logPlayerStat('deaths', deaths, summonerId);
									statsHelpers.logPlayerStat('assists', assists, summonerId);
									statsHelpers.logPlayerStat('doubleKills', doubleKills, summonerId);
									statsHelpers.logPlayerStat('tripleKills', tripleKills, summonerId);
									statsHelpers.logPlayerStat('quadraKills', quadraKills, summonerId);
									statsHelpers.logPlayerStat('pentaKills', pentaKills, summonerId);
									statsHelpers.logPlayerStat('goldEarned', goldEarned, summonerId);
									statsHelpers.logPlayerStat('wardsPlaced', wardsPlaced, summonerId);
									statsHelpers.logPlayerStat('damageDealt', damageDealt, summonerId);
									statsHelpers.logPlayerStat('damageDealtToChampions', damageDealtToChampions, summonerId);

									var csPerGame = Math.round(stats.playerStats[summonerId]['csTotal'] / stats.playerStats[summonerId]['gamesPlayed'] * 100) / 100,
										csPerMinAvg = Math.round(stats.playerStats[summonerId]['csTotal'] / stats.playerStats[summonerId]['timePlayedMin'] * 100) / 100,
										champLevelAvg = Math.round(stats.playerStats[summonerId]['champLevel'] / stats.playerStats[summonerId]['gamesPlayed'] * 10) / 10,
										timePlayedSecAvg = Math.round(stats.playerStats[summonerId]['timePlayedSec'] / stats.playerStats[summonerId]['gamesPlayed'] * 100) / 100,
										timePlayedMinAvg = Math.round(stats.playerStats[summonerId]['timePlayedMin'] / stats.playerStats[summonerId]['gamesPlayed'] * 100) / 100,
										killsPerGame = Math.round(stats.playerStats[summonerId]['kills'] / stats.playerStats[summonerId]['gamesPlayed'] * 100) / 100,
										deathsPerGame = Math.round(stats.playerStats[summonerId]['deaths'] / stats.playerStats[summonerId]['gamesPlayed'] * 100) / 100,
										assistsPerGame = Math.round(stats.playerStats[summonerId]['assists'] / stats.playerStats[summonerId]['gamesPlayed'] * 100) / 100,
										doubleKillsPerGame = Math.round(stats.playerStats[summonerId]['doubleKills'] / stats.playerStats[summonerId]['gamesPlayed'] * 100) / 100,
										tripleKillsPerGame = Math.round(stats.playerStats[summonerId]['tripleKills'] / stats.playerStats[summonerId]['gamesPlayed'] * 100) / 100,
										quadraKillsPerGame = Math.round(stats.playerStats[summonerId]['quadraKills'] / stats.playerStats[summonerId]['gamesPlayed'] * 100) / 100,
										pentaKillsPerGame = Math.round(stats.playerStats[summonerId]['pentaKills'] / stats.playerStats[summonerId]['gamesPlayed'] * 100) / 100,
										goldEarnedPerGame = Math.round(stats.playerStats[summonerId]['goldEarned'] / stats.playerStats[summonerId]['gamesPlayed'] * 100) / 100,
										wardsPlacedPerGame = Math.round(stats.playerStats[summonerId]['wardsPlaced'] / stats.playerStats[summonerId]['gamesPlayed'] * 100) / 100,
										damageDealtPerGame = Math.round(stats.playerStats[summonerId]['goldEarned'] / stats.playerStats[summonerId]['gamesPlayed'] * 100) / 100,
										damageDealtToChampionsPerGame = Math.round(stats.playerStats[summonerId]['goldEarned'] / stats.playerStats[summonerId]['gamesPlayed'] * 100) / 100;

									statsHelpers.updatePlayerStat('csPerGame', csPerGame, summonerId);
									statsHelpers.updatePlayerStat('csPerMinAvg', csPerMinAvg, summonerId);
									statsHelpers.updatePlayerStat('champLevelAvg', champLevelAvg, summonerId);
									statsHelpers.updatePlayerStat('timePlayedSecAvg', timePlayedSecAvg, summonerId);
									statsHelpers.updatePlayerStat('timePlayedMinAvg', timePlayedMinAvg, summonerId);
									statsHelpers.updatePlayerStat('killsPerGame', killsPerGame, summonerId);
									statsHelpers.updatePlayerStat('deathsPerGame', deathsPerGame, summonerId);
									statsHelpers.updatePlayerStat('assistsPerGame', assistsPerGame, summonerId);
									statsHelpers.updatePlayerStat('doubleKillsPerGame', doubleKillsPerGame, summonerId);
									statsHelpers.updatePlayerStat('tripleKillsPerGame', tripleKillsPerGame, summonerId);
									statsHelpers.updatePlayerStat('quadraKillsPerGame', quadraKillsPerGame, summonerId);
									statsHelpers.updatePlayerStat('pentaKillsPerGame', pentaKillsPerGame, summonerId);
									statsHelpers.updatePlayerStat('goldEarnedPerGame', goldEarnedPerGame, summonerId);
									statsHelpers.updatePlayerStat('wardsPlacedPerGame', wardsPlacedPerGame, summonerId);
									statsHelpers.updatePlayerStat('damageDealtPerGame', damageDealtPerGame, summonerId);
									statsHelpers.updatePlayerStat('damageDealtToChampionsPerGame', damageDealtToChampionsPerGame, summonerId);

									statsHelpers.logPlayerStatFlow('csPerMinAvgFlow', csPerMinAvg, summonerId);
									statsHelpers.logPlayerStatFlow('csPerGameFlow', csPerGame, summonerId);
									statsHelpers.logPlayerStatFlow('killsPerGameFlow', killsPerGame, summonerId);
									statsHelpers.logPlayerStatFlow('deathsPerGameFlow', deathsPerGame, summonerId);
									statsHelpers.logPlayerStatFlow('assistsPerGameFlow', assistsPerGame, summonerId);
									statsHelpers.logPlayerStatFlow('goldEarnedPerGameFlow', goldEarnedPerGame, summonerId);
									statsHelpers.logPlayerStatFlow('wardsPlacedPerGameFlow', wardsPlacedPerGame, summonerId);
									statsHelpers.logPlayerStatFlow('damageDealtPerGameFlow', damageDealtPerGame, summonerId);
									statsHelpers.logPlayerStatFlow('damageDealtToChampionsPerGameFlow', damageDealtToChampionsPerGame, summonerId);

									var largestKillingSpree = player.stats.largestKillingSpree;

									statsHelpers.logLargestPlayerStat('largestKillingSpree', largestKillingSpree, summonerId);

								}
							}

							statsHelpers.logTeamStat('gamesPlayed', 1);

							// Check if game was win or loss for team
							if(team.roster.indexOf(match.participantIdentities[9].player.summonerId) > -1) {
								if(match.participants[9].stats.winner == true) {
									statsHelpers.logTeamStat('gamesWon', 1);
								} else {
									statsHelpers.logTeamStat('gamesLost', 1);
								}
							} else {
								if(match.participants[9].stats.winner == false) {
									statsHelpers.logTeamStat('gamesWon', 1);
								} else {
									statsHelpers.logTeamStat('gamesLost', 1);
								}
							}

							iteratedGamesCount++;

						}).done(function() {
							if(iteratedGamesCount == team.matchHistory.length) {
								console.log("Done reading all matches!");
								console.log(stats);
								return true;
							}

						}).fail(function() {
							console.log("An error occured when loading a match");
							return false;
						});

					});

				}

			}).fail(function() {
				console.log("An error occured when loading ranked games");
				return false;
			});

	    });

	}).fail(function() {
	    console.log("An error occured when loading team");
	});

}