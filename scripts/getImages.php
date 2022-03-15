<?php
	session_start();
  include('./db.php');
  $items = [];
  if (isset($_POST['id']))
		$id = $_POST['id'];
  $query = "SELECT images.name FROM `images` WHERE images.iid = '$id'";
	$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
	if(mysqli_num_rows($result) > 0) {
		while($row = $result->fetch_assoc())
				$items[] = $row;
		echo json_encode(['items' => $items]);
	}
	else
		echo json_encode(false);
?>