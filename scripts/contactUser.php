<?php
  session_start();
  $uid = "";
  if(isset($_SESSION['uid']))
    $uid = $_SESSION['uid'];
  if ($uid) {
    if(isset($_POST['contactUser'])) {
      $_SESSION['contactUser'] = $_POST['contactUser'];
      echo json_encode(true);
    }
  } else echo json_encode(false);
?>