<header>
	<?php include('php/includes/nav.php'); ?>
</header>

<div class="notice-container" onclick="hideNotification()">
	<span>This is a notice!</span>
</div>
<div class="team-page">
	<button id="refresh" onclick="this.disabled=true; this.innerHTML='';">Refresh</button>
	<section class="team-header">
		<div class="team-icon">
			<img src="http://ddragon.leagueoflegends.com/cdn/5.22.1/img/champion/FiddleSticks.png" alt="Team icon">
		</div>
		<div class="team-details">
			<h1 id="test">We Are Gamers dk</h1>
			<ul>
				<li>WRGdk</li>
				<li>Europe West</li>
				<li>Silver II</li>
				<li>Fiddlesticks's Chimeras</li>
			</ul>
		</div>
	</section>

	<section class="team-roster">
		<h2>Team roster</h2>
		<ul>
			<li>
				<a href="http://euw.op.gg/summoner/userName=Azz4zzin" target="_blank">
					<div class="teamMemberProfileImage top"></div>
					<div class="teamMemberDetails">
						<p>Azz4zzin</p>
						<p>Silver I</p>
					</div>
				</a>
			</li>
			<li class="owner">
				<a href="http://euw.op.gg/summoner/userName=InfFluffy" target="_blank">
					<div class="teamMemberProfileImage jungle"></div>
					<div class="teamMemberDetails">
						<p>InfFluffy</p>
						<p>Silver IV</p>
					</div>
				</a>
			</li>
			<li>
				<a href="http://euw.op.gg/summoner/userName=Ganwar" target="_blank">
					<div class="teamMemberProfileImage mid"></div>
					<div class="teamMemberDetails">
						<p>Ganwar</p>
						<p>Gold V</p>
					</div>
				</a>
			</li>
			<li>
				<a href="http://euw.op.gg/summoner/userName=Gnifle" target="_blank">
					<div class="teamMemberProfileImage adc"></div>
					<div class="teamMemberDetails">
						<p>Gnifle</p>
						<p>Gold I</p>
					</div>
				</a>
			</li>
			<li>
				<a href="http://euw.op.gg/summoner/userName=Eiohas" target="_blank">
					<div class="teamMemberProfileImage support"></div>
					<div class="teamMemberDetails">
						<p>Eiohas</p>
						<p>Silver I</p>
					</div>
				</a>
			</li>
			<li>
				<a href="http://euw.op.gg/summoner/userName=Str4ms" target="_blank">
					<div class="teamMemberProfileImage jungle"></div>
					<div class="teamMemberDetails">
						<p>Str4ms</p>
						<p>Gold V</p>
					</div>
				</a>
			</li>
			<li>
				<a href="http://euw.op.gg/summoner/userName=Inquisitor+Bob" target="_blank">
					<div class="teamMemberProfileImage top"></div>
					<div class="teamMemberDetails">
						<p>Inquisitor Bob</p>
						<p>Unranked</p>
					</div>
				</a>
			</li>
		</ul>
	</section>

	<section class="team-latest">
		<h2>Latest 20 games</h2>
		<ul>
			<li class="latest-game win"></li>
			<li class="latest-game loss"></li>
			<li class="latest-game win"></li>
			<li class="latest-game loss"></li>
			<li class="latest-game win"></li>
			<li class="latest-game win"></li>
			<li class="latest-game win"></li>
			<li class="latest-game loss"></li>
			<li class="latest-game loss"></li>
			<li class="latest-game win"></li>
			<li class="latest-game loss"></li>
			<li class="latest-game loss"></li>
			<li class="latest-game win"></li>
			<li class="latest-game loss"></li>
			<li class="latest-game win"></li>
			<li class="latest-game loss"></li>
			<li class="latest-game loss"></li>
			<li class="latest-game win"></li>
			<li class="latest-game win"></li>
			<li class="latest-game win"></li>
		</ul>
	</section>

	<h1>Stats</h1>

	<section>
		<h2>CS records</h2>

		<div class="chart cl2">
			<div class="ct-chart" id="chart-cs"></div>
			<h3>Average CS per game</h3>
		</div>

		<div class="chart cl1 r1">
			<div class="ct-chart" id="chart-games"></div>
			<h3>Average CS per game</h3>
		</div>

		<div class="chart cl1 r1">
			<div class="ct-chart" id="chart-damageDealtChampions"></div>
			<h3>Average CS per game</h3>
		</div>

		<div class="chart cl1 r1">
			<div class="" id="chart-wardTest"></div>
			<h3>Average CS per game</h3>
		</div>
	</section>

	<section>
		<h2>Example table</h2>

		<div class="table-container">
			<table id="champions-table">
				<thead>
					<tr>
						<th>Champion</th>
						<th>Percentage</th>
						<th>Table head</th>
						<th>Table head</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Riven</td>
						<td>20%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
					<tr>
						<td>Darius</td>
						<td>30%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
					<tr>
						<td>Draven</td>
						<td>40%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
					<tr>
						<td>Kindred</td>
						<td>10%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
					<tr>
						<td>Amumu</td>
						<td>10%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
					<tr>
						<td>Ashe</td>
						<td>10%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
					<tr>
						<td>Gragas</td>
						<td>10%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
					<tr>
						<td>Tahm Kench</td>
						<td>10%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
					<tr>
						<td>Irelia</td>
						<td>10%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
					<tr>
						<td>Diana</td>
						<td>10%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
					<tr>
						<td>Malzahar</td>
						<td>10%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
					<tr>
						<td>Evelynn</td>
						<td>10%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
					<tr>
						<td>Varus</td>
						<td>10%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
					<tr>
						<td>Janna</td>
						<td>10%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
					<tr>
						<td>Thresh</td>
						<td>10%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
					<tr>
						<td>Nocturne</td>
						<td>10%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
					<tr>
						<td>Jarvan IV</td>
						<td>10%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
					<tr>
						<td>Wukong</td>
						<td>10%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
					<tr>
						<td>Jinx</td>
						<td>10%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
					<tr>
						<td>Maokai</td>
						<td>10%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
					<tr>
						<td>Hecarim</td>
						<td>10%</td>
						<td>Table body</td>
						<td>Table body</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</div>

<!--<footer class="frontpage-section">-->
<!--	<p>League55 isn't endorsed by Riot Games and doesn't reflect the-->
<!--		views or opinions of Riot Games or anyone officially-->
<!--		involved in producing or managing League of Legends.-->
<!--		League of Legends and Riot Games are trademarks or-->
<!--		registered trademarks of Riot Games, Inc. League of-->
<!--		Legends © Riot Games, Inc.</p>-->
<!--</footer>-->