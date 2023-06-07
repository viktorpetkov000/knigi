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
  if (isset($_POST['paypal_id']))
    $paypal_id = $_POST['paypal_id'];
  if (isset($_POST['paypal_email']))
    $paypal_email = $_POST['paypal_email'];
  if (isset($_POST['paypal_user_id']));
    $paypal_user_id = $_POST['paypal_user_id'];
  if (isset($_POST['paypal_date']))
    $paypal_date = $_POST['paypal_date'];

  if ($uid) {
    if ($iid) {
      if ($uid != $sid) {
        $query = "UPDATE items SET ended=1, buyerid='$uid', enddate='$date' WHERE id = '$iid' AND ended = 0 AND uid = '$sid'";
        $result = mysqli_query($conn,$query) or die(mysqli_error($conn));
        if (mysqli_affected_rows($conn)) {
          $insertPurchase = "INSERT INTO payments(`item_id`,`paypal_id`,`paypal_email`,`paypal_user_id`,`paypal_date`) VALUES('$iid','$paypal_id','$paypal_email', '$paypal_user_id', '$paypal_date')";
          $insertPurchaseStatus = mysqli_query($conn,$insertPurchase) or die(mysqli_error($conn));
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