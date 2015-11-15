//var APIkey = '84e3b234-db15-415b-8760-8e74c8f38500';

$(document).ready(function() {

	updateStats('TEAM-8c9dca90-36d6-11e4-acb5-c81f66db920c');
	calculateAverageCs();

});
var chartCs;
var uodChart = function() {
	chartCs.options.showLabel = false;
	chartCs.update();
};
function calculateAverageCs() {

	var region = 'euw';
	//var gnifleId = 29823543;
	//var wrgId = 'TEAM-8c9dca90-36d6-11e4-acb5-c81f66db920c';
	var teamMemberIds = [29823543, 25622346, 35260363, 20729856, 52337928, 46897122, 21760707, 19565972];
	var teamId = 'TEAM-8c9dca90-36d6-11e4-acb5-c81f66db920c';
	var gameIds = [2329983164, 2329843790, 2329772348, 2289627260];
	//var gameIds = [2329983164];
	var playerNames = {};
	var playerGames = {};
	var iteratedGames = 0;

	var averageStats = {
		players: {}
	};

	gameIds.forEach(function(gameId) {

		var playerMap = {};

		$.getJSON('https://' + region + '.api.pvp.net/api/lol/' + region + '/v2.2/match/' + gameId + '?api_key=' + APIkey, function (game) {

			// For each player in the game
			for(var i = 0; i < game.participantIdentities.length; i++) {

				var summonerId = game.participantIdentities[i].player.summonerId;
				var summonerName = game.participantIdentities[i].player.summonerName;
				var participantId = game.participantIdentities[i].participantId;

				//	If player is from current team (teamId)
				if(teamMemberIds.indexOf(summonerId) > -1) {

					//	 If player is not yet recorded
					if(averageStats.players[summonerId] === undefined) {

						//	  Record playerMap: participantId : summonerId
						playerMap[participantId] = summonerId;

						//	  Record playerNames: summonerId : summonerName
						playerNames[summonerId] = summonerName;

						//	  Record played games: summonerId : gamesPlayed
						playerGames[summonerId] = 1;

						//	  Record initial averageStats; averageStats.players.{summonerId}.{stat}
						averageStats.players[summonerId] = {};
						averageStats.players[summonerId]['cs'] = game.participants[participantId - 1].stats.minionsKilled + game.participants[participantId - 1].stats.neutralMinionsKilled;
						averageStats.players[summonerId]['totalDamageDealtToChampions'] = game.participants[participantId - 1].stats.totalDamageDealtToChampions;

					} else { // if player is already recorded

						//	  Update averageStats; averageStats.players.{summonerId}.{stat}
						averageStats.players[summonerId]['cs'] = averageStats.players[summonerId]['cs'] + game.participants[participantId - 1].stats.minionsKilled + game.participants[participantId - 1].stats.neutralMinionsKilled;
						averageStats.players[summonerId]['totalDamageDealtToChampions'] = averageStats.players[summonerId]['totalDamageDealtToChampions'] + game.participants[participantId - 1].stats.totalDamageDealtToChampions;

						//	  Update games played
						playerGames[summonerId] = playerGames[summonerId] + 1;

					}

				}

			}

			iteratedGames++;

		}).done(function() {

			// Only perform the average calculations once all matches have been counted
			if(iteratedGames == gameIds.length) {

				// Calculate averages
				Object.keys(averageStats.players).forEach(function(summonerId) {

					Object.keys(averageStats.players[summonerId]).forEach(function(key) {
						var keyTotal = averageStats.players[summonerId][key];
						averageStats.players[summonerId][key] = keyTotal / playerGames[summonerId];
					});

				});

				var players = []; // Collection of all players that have played games
				var csCount = []; // Used to calculate highest CS average for graph

				var csData = {
					labels: players,
					series: [[]]
				};

				var gamesPlayedData = {
					labels: players,
					series: [[]]
				};

				var damageDealtChampionsData = {
					labels: players,
					series: [[]]
				};

				Object.keys(playerGames).forEach(function(summonerId) {

					gamesPlayedData.series[0].push({
						meta: playerNames[summonerId],
						value: playerGames[summonerId]
					});

				});

				Object.keys(averageStats.players).forEach(function(summonerId) {

					// Add player to 'players'
					players.push(playerNames[summonerId]);

					// Add data to 'csData' and 'csCount'
					csData.series[0].push({
						meta: playerNames[summonerId],
						value: Math.round(averageStats.players[summonerId]['cs'] * 10) / 10
					});
					csCount.push(Math.round(averageStats.players[summonerId]['cs'] * 10) / 10);

					damageDealtChampionsData.series[0].push({
						meta: playerNames[summonerId],
						value: Math.round(averageStats.players[summonerId]['totalDamageDealtToChampions'] * 10) / 10
					});

				});

				// Create charts
				chartCs = new Chartist.Bar('#chart-cs', csData, {
					high: Math.max.apply(Math, csCount) * 1.1,
					low: 0,
					height: 200,
					fullWidth: true,
					plugins: [
						Chartist.plugins.tooltip({
							currency: 'Avg. CS: '
						})
					]
				}).on('created', function(chart) {
					$('#chart-cs').parent().css('opacity', 1.0);
						console.log(chart);
				});
				
				new Chartist.Bar('#chart-games', gamesPlayedData, {
					height: 200,
					fullWidth: true,
					plugins: [
						Chartist.plugins.tooltip({
							currency: 'Games played: '
						})
					]
				});

				new Chartist.Bar('#chart-damageDealtChampions', damageDealtChampionsData, {
					low: 0,
					height: 200,
					fullWidth: true,
					plugins: [
						Chartist.plugins.tooltip({
							currency: 'Damage: '
						})
					]
				});

				new Chartist.Pie('#chart-wardTest', {
					labels: players,
					series: [2, 8, 17, 5, 3, 31, 7]
				}, {
					height: 200,
					donut: true,
					donutWidth: 30,
					startAngle: 270,
					showLabel: false,
					plugins: [
						Chartist.plugins.tooltip({
							currency: 'Wards: '
						})
					]
				});

			}

		}); // End .done()

	});

}