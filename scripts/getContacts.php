<?php
	session_start();
  include('./db.php');
  $data = [];
	$admin = false;
	$id = "";
	if (isset($_SESSION['admin'])) {
		$admin = $_SESSION['admin'];
		if (isset($_POST['id'])) {
			$id = $_POST['id'];
		}
	}
  if (isset($_SESSION['uid']))
    $uid = $_SESSION['uid'];

	if (!$id) {
		$query = "SELECT receivedby, sentby FROM `messages` WHERE sentby = '$uid' OR receivedby = '$uid'";
		$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
		if(mysqli_num_rows($result) > 0) {
			while($row = $result->fetch_assoc())
				$data[] = $row;

			echo json_encode(['data' => $data, 'uid' => $uid]);
		}
		else
			echo json_encode(false);
	} else if ($admin && $id) {
		$query = "SELECT receivedby, sentby FROM `messages` WHERE sentby = '$id' OR receivedby = '$id'";
		$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
		if(mysqli_num_rows($result) > 0) {
			while($row = $result->fetch_assoc())
				$data[] = $row;

			echo json_encode(['data' => $data, 'uid' => $id]);
		}
		else
			echo json_encode(false);
	}
?>