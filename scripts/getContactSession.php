<?php
  session_start();
  $uid = "";
  if(isset($_SESSION['uid']))
    $uid = $_SESSION['uid'];
  if ($uid) {
    if(isset($_SESSION['contactUser'])) {
      echo json_encode($_SESSION['contactUser']);
    }
  } else echo json_encode(false);
?>