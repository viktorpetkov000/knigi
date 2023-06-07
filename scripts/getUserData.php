<?php
	session_start();
	include('db.php');
	$data = [];
  $userdata;
  $itemdatafinished;
  $itemdataactive;
  $ratingdata = [];
  $uid = "";
  $page = 0;
  if (isset($_POST['page']))
    $page = intval($_POST['page']);
  $limithigh = 8;
  $limitlow = 8*$page;
  if (isset($_POST['uid']))
    $uid = $_POST['uid'];

  if ($uid) {
    $query = "SELECT username,uid,isadmin FROM `accounts` WHERE uid = '$uid'";
    $result = mysqli_query($conn,$query) or die(mysqli_error($conn));
    if(mysqli_num_rows($result) > 0) {
      while($row = $result->fetch_assoc())
        $userdata = $row;
      $data[] = $userdata;
      $query = "SELECT COUNT(id) FROM `items` WHERE uid = '$uid' AND ended = 0";
      $result = mysqli_query($conn,$query) or die(mysqli_error($conn));
      if(mysqli_num_rows($result) > 0) {
        while($row = $result->fetch_assoc())
          $itemdataactive = $row;
        $data[] = $itemdataactive;
        $query = "SELECT COUNT(id) FROM `items` WHERE uid = '$uid' AND ended = 1";
        $result = mysqli_query($conn,$query) or die(mysqli_error($conn));
        if(mysqli_num_rows($result) > 0) {
          while($row = $result->fetch_assoc())
            $itemdatafinished = $row;
          $data[] = $itemdatafinished;
          $query = "SELECT items.rating,items.buyerid,accounts.username FROM `items` INNER JOIN accounts ON items.buyerid=accounts.uid WHERE items.rating > 0 AND items.uid = '$uid' ORDER BY items.id DESC LIMIT $limitlow, $limithigh;";
          $result = mysqli_query($conn,$query) or die(mysqli_error($conn));
          if(mysqli_num_rows($result) > 0) {
            while($row = $result->fetch_assoc())
              $ratingdata[] = $row;
            $data[] = $ratingdata;
          }
        }
      }
      echo json_encode(['data' => $data]);
    }
    else
      echo json_encode(false);
  } else echo json_encode("Няма открит потребител");
?>