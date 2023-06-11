<?php
	session_start();
	include('./db.php');

  $uid = "";
  $iid = "";
  $sid = "";
  date_default_timezone_set('Europe/Sofia');
  $date = date("Y-m-d h:i:sa");
  $address = "";
  $phone = "";

  if (isset($_POST['iid']))
    $iid = $_POST['iid'];
  if (isset($_SESSION['uid']))
    $uid = $_SESSION['uid'];
  if (isset($_POST['sid']));
    $sid = $_POST['sid'];

  if ($uid) {
    if ($iid) {
      if ($uid != $sid) {
        $query = "SELECT address,phone FROM accounts WHERE uid = '$uid'";
        $result = mysqli_query($conn,$query) or die(mysqli_error($conn));
        if(mysqli_num_rows($result) > 0) {
          while($row = $result->fetch_assoc()) {
            $address = $row["address"];
            $phone = $row["phone"];
          }
        }
        if ($address && $phone) {
          echo json_encode("4");
        } else echo json_encode("6");
      } else echo json_encode("5");
    } else echo json_encode("2");
  } else echo json_encode("1");
?>