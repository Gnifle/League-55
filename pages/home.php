<header class="frontpage">
	<?php include('php/includes/nav-frontpage.php'); ?>

	<h1 class="frontpage-title">Find your team</h1>

	<div class="frontpage-form" id="summonerForm">
		<h2>Search by summoner name...</h2>
		<div class="form-area">
			<form id="summonerNameInput" action="">
				<input id="summonerName" type="text" placeholder="Enter summoner name..." autocomplete="off">
				<button class="form-submit" type="submit">
					<i class="form-search" id="summoner-form-search"></i>
				</button>
			</form>
			<ul id="summonerTeamList"></ul>
		</div>
	</div>

	<div class="frontpage-form" id="teamForm">
		<h2>... Or search by team name or tag</h2>
		<form action="">
			<div class="form-area">
				<input type="text" placeholder="Search team / tag name...">
				<button class="form-submit" type="submit">
					<i class="form-search" id="team-form-search"></i>
				</button>
			</div>
			<a class="popup">
				Why is my team not showing up?
				<span>
					Due to limitations in the Riot API, it is
					not possible to search directly for a team. But
					you can register a team in <span class="underline">our</span> database by searching
					for your summoner name just once and anyone will
					be able to search for the name / tag here in the future!
				</span>
			</a>
		</form>
	</div>

	<div class="frontpage-form" id="region-select">
		<h2>Select region</h2>
		<div class="form-area">
			<select id="summonerRegion">
				<option value="euw">EUW</option>
				<option value="eune">EUNE</option>
				<option value="na">NA</option>
				<option value="kr">KR</option>
				<option value="lan">LAN</option>
				<option value="las">LAS</option>
				<option value="br">BR</option>
				<option value="oce">OCE</option>
				<option value="tr">TR</option>
				<option value="ru">RU</option>
			</select>
		</div>
	</div>
</header>

<div class="frontpage-section">
</div>

<div class="frontpage-section">About</div>
<div class="frontpage-section">Contact</div>
<footer class="frontpage-section">
	<p>League55 isn't endorsed by Riot Games and doesn't reflect the
		views or opinions of Riot Games or anyone officially
		involved in producing or managing League of Legends.
		League of Legends and Riot Games are trademarks or
		registered trademarks of Riot Games, Inc. League of
		Legends © Riot Games, Inc.</p>
</footer>