<?php
  session_start();
  include('db.php');
  $sentby = "";
  $receivedby = "";
  $message = "";
  date_default_timezone_set('Europe/Sofia');
  $created = date("Y-m-d h:i:sa");
  $data = [];

  if(isset($_SESSION['uid']))
    $sentby = $_SESSION['uid'];

  if(isset($_POST['receivedby']))
    $receivedby = $_POST['receivedby'];

  if(isset($_POST['message']))
    $message = $_POST['message'];

  if (isset($_SESSION['contactSeller']))
		$receivedby = $_SESSION['contactSeller'];

  if($message != "") {
    $query = "INSERT INTO messages(sentby,receivedby,message,created) VALUES('$sentby','$receivedby','$message','$created')";
    $result = mysqli_query($conn,$query) or die(mysqli_error($conn));
    
    if (mysqli_affected_rows($conn)) {
      $data[] = $message;
      $data[] = $created;
      echo json_encode($data);
    } else {
      echo json_encode("Fail!");
    }
  }
?>