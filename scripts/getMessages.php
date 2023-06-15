<?php
	session_start();
  include('./db.php');
	$data = [];
	$mup = [];
	$id = "";
	$admin = false;
	if (isset($_SESSION['admin'])) {
		$admin = $_SESSION['admin'];
		if (isset($_POST['id']))
			$id = $_POST['id'];
	}
  if (isset($_SESSION['uid']))
		$uid = $_SESSION['uid'];
		
	if (isset($_SESSION['mup']))
		$mup = $_SESSION['mup'];
	else
		$_SESSION['mup'] = $mup;

  if (isset($_POST['cid']))
    $cid = $_POST['cid'];

	$username = "";

	if (!$id) {
		$query = "SELECT username FROM `accounts` WHERE uid = '$cid'";
		$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
			if(mysqli_num_rows($result) > 0)
				while($row = $result->fetch_assoc())
					$username = $row['username'];
		$query = "SELECT receivedby, sentby, message, created FROM `messages` WHERE (sentby = '$uid' OR receivedby = '$uid') AND (sentby = '$cid' OR receivedby = '$cid')";
		$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
		if(mysqli_num_rows($result) > 0) {
			while($row = $result->fetch_assoc())
				$data[] = $row;
			echo json_encode(['data' => $data, 'uid' => $uid, 'username' => $username, 'code' => "4"]);
			$query = "UPDATE messages SET viewed = 1 WHERE sentby = '$cid' AND receivedby = '$uid'";
			$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
			$count = mysqli_affected_rows($conn);
		}
		else
			echo json_encode(['username' => $username, 'code' => "5"]);
	// } else if ($admin && $id) {
	// 	$query = "SELECT receivedby, sentby, message, created FROM `messages` WHERE (sentby = '$id' OR receivedby = '$id') AND (sentby = '$cid' OR receivedby = '$cid')";
	// 	$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
	// 	if(mysqli_num_rows($result) > 0) {
	// 		while($row = $result->fetch_assoc())
	// 			$data[] = $row;
	// 		echo json_encode(['data' => $data, 'uid' => $id]);
	// 	}
	// 	else
	// 		echo json_encode(false);
	} else echo json_encode(false);
?>