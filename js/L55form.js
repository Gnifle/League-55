$(document).ready(function() {

	$('#summonerNameInput').on('submit', function(e) {

		// Surpress regular form submission behaviour
		e.preventDefault();

		// Stores submitted data from form
		var	region =		$('#summonerRegion').val(),
			summonerName =	$('#summonerName').val().toLowerCase().replace(/\s+/g, ''),
			summonerId;

		formHelpers.clearInputForm();

		if(summonerName.length > 0) {

			formHelpers.loading(true);

			// Get summonerId by summonerName
			$.getJSON('https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.4/summoner/by-name/' + summonerName + '?api_key=' + APIkey, function(summoner) {
				summonerId = summoner[summonerName].id;

			// If summoner exists
			}).done(function() {

				// Get teams by retrieved summonerId
				$.getJSON('https://' + region + '.api.pvp.net/api/lol/' + region + '/v2.4/team/by-summoner/' + summonerId + '?api_key=' + APIkey, function (teamList) {

					$.each(teamList[summonerId], function (key, team) {
						formHelpers.appendTeam(team, region);
					});

				// If summoner is not in any team
				}).fail(function () {
					formHelpers.appendNotice('error', 'Summoner is not in any team!');
				});

			// Else, handle errors
			}).fail(function(error) {
				formHelpers.handleError(error);
			});

			formHelpers.loading(false);
			setCookie('region', region, 10000);

		} else {
			formHelpers.appendNotice('request', 'Please enter a summoner name!');
		}

	});

});