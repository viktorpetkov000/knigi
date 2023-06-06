<?php
	session_start();
	include('./db.php');
	$uid = "";
  $id = "";
  $items = [];
  if (isset($_POST['id']))
    $id = $_POST['id'];
  if (isset($_SESSION['uid']))
		$uid = $_SESSION['uid'];

	if ($uid) {
		if ($id) {
			$query = "UPDATE items SET ended = 1 WHERE id = '$id' AND uid = '$uid' AND ended = 0";
			$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
			if (mysqli_affected_rows($conn))
				echo json_encode("4");
			else echo json_encode("3");
		} else echo json_encode("2");
	} else echo json_encode("1");
?>