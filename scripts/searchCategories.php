<?php
	session_start();
  include('./db.php');
	$items = [];
	$page = 0;
	$images = [];
	if (isset($_POST['page']))
		$page = intval($_POST['page']);
	$limithigh = 6;
	$limitlow = 6*$page;
	$category = "";
	$subcategory = "";
	$subcategory2 = "";

	if ($page >= 0) {
		$query = "SELECT * FROM `items` WHERE ";
		if (isset($_POST['category'])) {
			$category = $_POST['category'];
			$query = "SELECT items.title, accounts.username, items.price, items.descr, items.startdate, items.id FROM `items`
			INNER JOIN accounts ON items.uid = accounts.uid
			WHERE items.category = '$category' AND items.ended = 0 ORDER BY items.id DESC LIMIT $limitlow, $limithigh;";
		}

		if (isset($_POST['subCategory'])) {
			$category = $_POST['category'];
			$subcategory = $_POST['subCategory'];
			$query = "SELECT items.title, accounts.username, items.price, items.descr, items.startdate, items.id FROM `items`
			INNER JOIN accounts ON items.uid = accounts.uid
			WHERE category = '$category' AND subcategory = '$subcategory' AND ended = 0 ORDER BY id DESC LIMIT $limitlow, $limithigh; ";
		}

		if (isset($_POST['subCategory2'])) {
			$category = $_POST['category'];
			$subcategory = $_POST['subCategory'];
			$subcategory2 = $_POST['subCategory2'];
			$query = "SELECT items.title, accounts.username, items.price, items.descr, items.startdate, items.id FROM `items`
			INNER JOIN accounts ON items.uid = accounts.uid
			WHERE category = '$category' AND subcategory = '$subcategory' AND subcategory2 = '$subcategory2' AND ended = 0 ORDER BY id DESC LIMIT $limitlow, $limithigh;";
		}

		$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
		if(mysqli_num_rows($result) > 0) {
			while($row = $result->fetch_assoc())
					$items[] = $row;
			echo json_encode(['items' => $items, 'page' => $page]);
		}
		else
			echo json_encode(false);
	}
?>