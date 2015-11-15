<?php

function resolvePage() {

	$pageKey = null;
	$varCount = count($_GET);

	if($varCount == 0) {
		include(ROOT . '/pages/home.php');
		return;

	} else if($varCount == 1) {

		if(isset($_GET['page'])) {

			$pageKey = $_GET['page'];

			switch(strtolower($pageKey)) {

				case "home":
					include(ROOT . "/pages/home.php");
					break;
				case "about":
					echo "About";
					break;
				case "changelog":
					echo "Changelog";
					break;
				case "classes":
					echo "Classes";
					break;
				case "weapons":
					include(ROOT . "/pages/app-weapon.php");
					break;
				case "skins":
					echo "Skins";
					break;
				case "equipment":
					echo "Equipment";
					break;
				case "taunts":
					echo "Taunts";
					break;
				case "unlockables":
					echo "Unlockables";
					break;
				case "contact":
					echo "Contact";
					break;
				default:
					echo "404";
					break;

			}

		}

	} else if($varCount == 2) {

		if($_GET['page'] == "weapons") {

			if(isset($_GET['title'])) {

				include(ROOT . "/pages/weaponDisplay.php");

			}

		}

	} else if($varCount == 3) {

		if($_GET['page'] == "teams") {

			if(isset($_GET['region']) && isset($_GET['tag'])) {

				include('pages/team.php');
//				echo $_GET['page'] . '/' . $_GET['region'] . '/' . $_GET['tag'];

			}

		}

	}

}

$page = null;

function pageTitle() {

	$pageKey = null;
	$pageTitle = null;

	if(isset($_GET['page'])) {
		$pageKey = $_GET['page'];
	}

	switch($pageKey) {

		case "":
			$pageTitle = "Home";
			break;
		case "home":
			$pageTitle = "Home";
			break;
		case "teams":
			$pageTitle = "Teams";
			break;
		default:
			$pageTitle = "404 Page not found";
			break;

	}
	echo $pageTitle . " // League 5v5";

}

function getBaseURL() {
	$whitelist = array(
		'127.0.0.1',
		'::1'
	);

	if(!in_array($_SERVER['REMOTE_ADDR'], $whitelist)){
		echo '<base href="/">';
	} else {
		echo '<base href="/projects/league55/">';
	}
}