<?php
	session_start();
	include('./db.php');
	$uid = "";
  if (isset($_SESSION['uid']))
		$uid = $_SESSION['uid'];
  if (isset($_POST['iban']))
    $iban = $_POST['iban'];
	if ($uid) {
			$query = "UPDATE accounts SET iban = '$iban' WHERE uid = '$uid'";
			$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
			if (mysqli_affected_rows($conn))
				echo json_encode("3");
			else echo json_encode("3");
	} else echo json_encode("1");
?>