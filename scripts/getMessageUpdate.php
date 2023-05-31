<?php
	session_start();
  include('./db.php');
  $data = [];
  $uid = "";
  $mup = [];
  $count = 0;
  $new = [];
  if (isset($_SESSION['uid']))
    $uid = $_SESSION['uid'];

    
  $query = "SELECT sentby FROM `messages` WHERE (receivedby = '$uid')";
	$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
	if(mysqli_num_rows($result) > 0) {
		while($row = $result->fetch_assoc())
      $data[] = $row;

    if (isset($_SESSION['mup']))
      $mup = $_SESSION['mup'];
    else {
      $_SESSION['mup'] = $data;
      $mup = $_SESSION['mup'];
    }
    if ($mup != $data) {
      $_SESSION['mup'] = $data;
      $count = count($data) - count($mup);
      for ($i = 1; $i < $count+1; $i++) {
        $new[] = $data[count($data)-$i];
      }
      echo json_encode(['uid' => $uid, 'new' => $new]);
    }
	}
	else
    echo json_encode(false);
?>