<?php
	session_start();
	include('./db.php');
	$uid = "";
  if (isset($_SESSION['uid']))
		$uid = $_SESSION['uid'];
  if (isset($_POST['address']))
    $address = $_POST['address'];
  if (isset($_POST['phone']))
    $phone = $_POST['phone'];
	if ($uid) {
			$query = "UPDATE accounts SET address = '$address', phone = '$phone' WHERE uid = '$uid'";
			$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
			if (mysqli_affected_rows($conn))
				echo json_encode("3");
			else echo json_encode("2");
	} else echo json_encode("1");
?>