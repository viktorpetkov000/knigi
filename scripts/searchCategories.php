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
	$minPrice = 0;
	$maxPrice = 0;
	$priceLow = 0;
	$priceLowReturn = -1;
	$priceHighReturn = -1;
	$priceHigh = -1;
	$sort = 0;
	$name = "";
	$nameString = "";
	$priceString = "";
	if (isset($_POST['priceLow']))
		$priceLow = intval($_POST['priceLow']);
	if (isset($_POST['priceHigh']))
		$priceHigh = intval($_POST['priceHigh']);
	if (isset($_POST['sort']))
		$sort = intval($_POST['sort']);
	if (isset($_POST['name']))
		$name = $_POST['name'];
	switch ($sort) {
		case 0:
			$sortString = "items.id DESC";
			break;
		case 1:
			$sortString = "items.id ASC";
			break;
		case 2:
			$sortString = "items.price DESC";
			break;
		case 3:
			$sortString = "items.price ASC";
			break;
		default:
			$sortString = "items.id DESC";
			break;
	}
	if ($priceLow && $priceHigh) {
		$priceString = "AND items.price BETWEEN $priceLow AND $priceHigh";
	}
	if ($name != "")
		$nameString = "AND items.title LIKE '%$name%'";

	if ($page >= 0) {
		$query = "SELECT * FROM `items` WHERE ";
		if (isset($_POST['category'])) {
			$category = $_POST['category'];
			$query2 = "SELECT MIN(price) AS min, MAX(price) AS max FROM `items` WHERE category = '$category' AND ended = 0;";
			$query = "SELECT items.title, accounts.username, items.price, items.descr, items.startdate, items.id FROM `items`
			INNER JOIN accounts ON items.uid = accounts.uid
			WHERE items.category = '$category' AND items.ended = 0 $nameString $priceString ORDER BY $sortString LIMIT $limitlow, $limithigh;";
		}

		if (isset($_POST['subCategory'])) {
			$category = $_POST['category'];
			$subcategory = $_POST['subCategory'];
			$query2 = "SELECT MIN(price) AS min, MAX(price) AS max FROM `items` WHERE category = '$category' AND subcategory = '$subcategory' AND ended = 0;";
			$query = "SELECT items.title, accounts.username, items.price, items.descr, items.startdate, items.id FROM `items`
			INNER JOIN accounts ON items.uid = accounts.uid
			WHERE category = '$category' AND subcategory = '$subcategory' AND ended = 0 $nameString $priceString ORDER BY $sortString LIMIT $limitlow, $limithigh; ";
		}

		if (isset($_POST['subCategory2'])) {
			$category = $_POST['category'];
			$subcategory = $_POST['subCategory'];
			$subcategory2 = $_POST['subCategory2'];
			$query2 = "SELECT MIN(price) AS min, MAX(price) AS max FROM `items` WHERE category = '$category' AND subcategory = '$subcategory' AND subcategory2 = '$subcategory2' AND ended = 0;";
			$query = "SELECT items.title, accounts.username, items.price, items.descr, items.startdate, items.id FROM `items`
			INNER JOIN accounts ON items.uid = accounts.uid
			WHERE category = '$category' AND subcategory = '$subcategory' AND subcategory2 = '$subcategory2' AND ended = 0 $nameString $priceString ORDER BY $sortString LIMIT $limitlow, $limithigh;";
		}

		$result2 = mysqli_query($conn,$query2) or die(mysqli_error($conn));
		if(mysqli_num_rows($result2) > 0) {
			while($row2 = $result2->fetch_assoc()) {
				$priceLowReturn = $row2['min'];
				$priceHighReturn = $row2['max'];
			}
		}

		$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
		if(mysqli_num_rows($result) > 0) {
			while($row = $result->fetch_assoc())
					$items[] = $row;
			echo json_encode(['items' => $items, 'page' => $page, 'priceLowReturn' => $priceLowReturn, 'priceHighReturn' => $priceHighReturn]);
		}
		else
			echo json_encode(false);
	}
?>