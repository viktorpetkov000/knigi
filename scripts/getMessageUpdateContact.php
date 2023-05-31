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

  if (isset($_POST['cid']))
    $cid = $_POST['cid'];

    
  $query = "SELECT receivedby, sentby, message, created FROM `messages` WHERE (receivedby = '$uid') AND (sentby = '$cid')";
	$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
	if(mysqli_num_rows($result) > 0) {
		while($row = $result->fetch_assoc())
      $data[] = $row;

    if (isset($_SESSION['currentchat']))
      $currentchat = $_SESSION['currentchat'];
    else {
      $_SESSION['currentchat'] = $data;
      $currentchat = $_SESSION['currentchat'];
    }
    if ($currentchat != $data) {
      $_SESSION['currentchat'] = $data;
      $count = count($data) - count($currentchat);
      for ($i = 1; $i < $count+1; $i++) {
        $new[] = $data[count($data)-$i];
      }
      echo json_encode(['new' => $new]);
    }
	}
	else
    echo json_encode(false);
?>