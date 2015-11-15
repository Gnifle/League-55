<?php include_once('dir.php'); ?>
<?php include_once('php/pageHandler.php'); ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<link rel="shortcut icon" type="image/x-icon" href="images/favicon/favicon.ico">
	<title><?php pageTitle(); ?></title>
	
	<?php include('php/includes/head.php'); ?>
</head>
<body>

	<div id="page">
		<?php resolvePage(); ?>
	</div>

</body>
</html>