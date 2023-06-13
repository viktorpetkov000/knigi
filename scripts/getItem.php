<?php
	session_start();
  include('./db.php');
  $items = [];
  if (isset($_POST['id']))
		$id = $_POST['id'];
	if (isset($_SESSION['uid']))
		$uid = $_SESSION['uid'];
	$checkUid = "";
	$ownItem = false;
  $query = "SELECT items.*, images.name FROM `items` INNER JOIN images ON items.id = images.iid WHERE items.id = '$id'";
	$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
	if(mysqli_num_rows($result) > 0) {
		while($row = $result->fetch_assoc()) {
				$items[] = $row;
				$checkUid = $row["uid"];
		}
		if ($checkUid == $uid)
			$ownItem=true;
		echo json_encode(['items' => $items, 'ownItem' => $ownItem]);
	}
	else
		echo json_encode(false);
?>