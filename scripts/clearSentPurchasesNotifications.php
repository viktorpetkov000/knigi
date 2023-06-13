<?php
	session_start();
  include('./db.php');
	$uid = "";
  $iid = "";
  if (isset($_POST['iid']))
    $iid = $_POST['iid'];
  if (isset($_SESSION['uid']))
		$uid = $_SESSION['uid'];

	if ($uid) {
			$query = "UPDATE items SET read_buyer = 1 WHERE id = '$iid' AND buyerid = '$uid'";
			$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
			if (mysqli_affected_rows($conn))
				echo json_encode(true);
			else 
				echo json_encode(false);
  } else echo json_encode(false);
?>