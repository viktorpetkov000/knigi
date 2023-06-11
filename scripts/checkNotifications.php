<?php
	session_start();
  include('./db.php');
  $data = [];
  $uid = "";
  $mup = [];
  $count = 0;
  $new = [];
  $result;
  if (isset($_SESSION['uid']))
    $uid = $_SESSION['uid'];

    
  if ($uid) {
    $query = "SELECT COUNT(*) as total FROM `messages` WHERE receivedby = '$uid' AND viewed = 0";
    $result = mysqli_query($conn,$query) or die(mysqli_error($conn));
		if(mysqli_num_rows($result) > 0) {
			while($row = $result->fetch_assoc())
				$data[] = $row;
			echo json_encode(['data' => $data, 'uid' => $uid]);
		}
		else
			echo json_encode(false);
  }
?>