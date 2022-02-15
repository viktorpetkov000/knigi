<?php
	session_start();
  include('./db.php');
	$items = [];
  $query = "SELECT * FROM `items` WHERE ended = 0 ORDER BY id DESC LIMIT 0, 10;";
  $result = mysqli_query($conn,$query) or die(mysqli_error($conn));
  if(mysqli_num_rows($result) > 0) {
    while($row = $result->fetch_assoc())
        $items[] = $row;
    echo json_encode(['items' => $items]);
  }
  else
    echo json_encode(false);
?>