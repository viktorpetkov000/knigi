<?php
	session_start();
  include('./db.php');
  $id = "";
  $rate = "";
  $uid = "";
  if (isset($_SESSION['uid']))
    $uid = $_SESSION['uid'];
	if (isset($_POST['id']))
		$id = $_POST['id'];
	if (isset($_POST['rate']))
		$rate = $_POST['rate'];
  
  if ($id != "" && $uid != "") {
    if ($rate > 0 && $rate < 3) {
      $query = "UPDATE items SET rating = $rate WHERE id = '$id' AND buyerid = '$uid'";
      $result = mysqli_query($conn,$query) or die(mysqli_error($conn));
			if (mysqli_affected_rows($conn))
				echo json_encode("4");
			else echo json_encode("3");
		} else echo json_encode("2");
	} else echo json_encode("1");
?>