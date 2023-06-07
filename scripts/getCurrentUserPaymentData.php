<?php
	session_start();
  include('./db.php');
  if (isset($_SESSION['uid']))
    $uid = $_SESSION['uid'];

  if ($uid) {
    $query = "SELECT uid, email, message, created FROM `messages` WHERE (sentby = '$uid' OR receivedby = '$uid') AND (sentby = '$cid' OR receivedby = '$cid')";
    $result = mysqli_query($conn,$query) or die(mysqli_error($conn));
    if(mysqli_num_rows($result) > 0) {
      while($row = $result->fetch_assoc())
      $data[] = $row;
      echo json_encode(['data' => $data, 'uid' => $uid]);
    }
  }
?>