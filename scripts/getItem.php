<?php
	session_start();
  include('./db.php');
  $items = [];
  if (isset($_POST['id']))
		$id = $_POST['id'];
	if (isset($_SESSION['uid']))
		$uid = $_SESSION['uid'];
	$checkUid = "";
	$checkUidBuyer = "";
	$sellerName = "";
	$ownItem = false;
	$boughtItem = false;
  $query = "SELECT items.*, images.name, accounts.username, accounts.uid FROM `items`
	INNER JOIN accounts ON items.uid = accounts.uid
	INNER JOIN images ON items.id = images.iid WHERE items.id = '$id' AND accounts.uid = items.uid";
	$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
	if(mysqli_num_rows($result) > 0) {
		while($row = $result->fetch_assoc()) {
				$items[] = $row;
				$checkUid = $row["uid"];
				$checkBuyer = $row["buyerid"];
				$sellerName = $row["username"];
				$checkUidBuyer = $row["uid"];
		}
		if ($checkUid == $uid)
			$ownItem=true;
		if ($checkBuyer == $uid)
			$boughtItem=true;
		echo json_encode(['items' => $items, 'ownItem' => $ownItem, 'boughtItem' => $boughtItem,
		 'sellerName' => $sellerName, 'sellerUid' => $checkUidBuyer]);
	} else echo json_encode(false);
?>