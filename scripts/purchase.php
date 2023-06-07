<?php
	session_start();
	include('./db.php');

  $uid = "";
  $iid = "";
  $sid = "";
  date_default_timezone_set('Europe/Sofia');
  $date = date("Y-m-d h:i:sa");

  if (isset($_POST['iid']))
    $iid = $_POST['iid'];
  if (isset($_SESSION['uid']))
    $uid = $_SESSION['uid'];
  if (isset($_POST['sid']));
    $sid = $_POST['sid'];

  if ($uid) {
    if ($iid) {
      if ($uid != $sid) {
        $query = "UPDATE items SET ended=1, buyerid='$uid', enddate='$date' WHERE id = '$iid' AND ended = 0 AND uid = '$sid'";
        $result = mysqli_query($conn,$query) or die(mysqli_error($conn));
        if (mysqli_affected_rows($conn)) {
          // $insertPurchase = "INSERT INTO payments(`username`,`email`,`password`,`salt`,`code`,`tax`) VALUES('$username','$email','$newPassword', '$salt', '$hash', 12)";
          // $insertPurchaseStatus = mysqli_query($conn,$insertUser) or die(mysqli_error($conn));
          echo json_encode("4");
          // $query = "SELECT price FROM `items` WHERE id = '$iid'";
          // $result = mysqli_query($conn,$query) or die(mysqli_error($conn));
          // if(mysqli_num_rows($result) > 0) {
          //       $users[] = $row;
          // $query = "UPDATE accounts SET monthlysum WHERE uid = '$sid'";
          // $result = mysqli_query($conn,$query) or die(mysqli_error($conn));
        }
        else echo json_encode("3");
      } else echo json_encode("5");
    } else echo json_encode("2");
  } else echo json_encode("1");
?>