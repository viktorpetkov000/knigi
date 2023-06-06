<?php
	session_start();
  include('./db.php');
  $items = [];
	$uid = "";
	$page = 0;
	if (isset($_POST['page']))
		$page = intval($_POST['page']);
	$limithigh = 5;
	$limitlow = 5*$page;
	$mode = "";
  if (isset($_POST['mode']))
    $mode = $_POST['mode'];

	if (isset($_POST['uid']))
    $uid = $_POST['uid'];
	elseif (isset($_SESSION['uid']))
    $uid = $_SESSION['uid'];

    
  $query = "SELECT * FROM `items` WHERE uid = '$uid' AND ended = '$mode' ORDER BY id DESC LIMIT $limitlow, $limithigh;";
	$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
	if(mysqli_num_rows($result) > 0) {
		while($row = $result->fetch_assoc())
				$items[] = $row;
		echo json_encode(['items' => $items]);
	}
	else
		echo json_encode(false);
?>