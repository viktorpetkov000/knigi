<?php
	session_start();
  include('./db.php');
  $data = [];
  $uid = "";
  $result;
  if (isset($_SESSION['uid']))
    $uid = $_SESSION['uid'];
    
  if ($uid) {
    $query = "SELECT id FROM `items` WHERE ended = 1 AND buyerid != 0 AND sent = 1 AND read_buyer = 0 AND buyerid = '$uid'";
    $result = mysqli_query($conn,$query) or die(mysqli_error($conn));
		if(mysqli_num_rows($result) > 0) {
			while($row = $result->fetch_assoc())
				$data[] = $row;
			echo json_encode(['data' => $data]);
		}
		else
			echo json_encode(false);
  }
?>