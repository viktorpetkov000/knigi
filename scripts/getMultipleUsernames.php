<?php
	session_start();
	include('db.php');
  $data = [];
  
  if (isset($_POST['uid']))
    $uid = $_POST['uid'];
    
	$query = "SELECT username, uid FROM `accounts` WHERE uid IN ($uid)";
	$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
	if(mysqli_num_rows($result) > 0) {
		while($row = $result->fetch_assoc())
				$data[] = $row;
		echo json_encode(['data' => $data]);
	}
	else
		echo json_encode(false);
?>