<?php
	session_start();
	include('db.php');
	$data = [];
  $uid = "";
  $page = 0;
  if (isset($_POST['page']))
    $page = intval($_POST['page']);
  $limithigh = 8;
  $limitlow = 8*$page;
  if (isset($_POST['uid']))
    $uid = $_POST['uid'];

  if ($uid) {
    $query = "SELECT items.rating,items.buyerid,accounts.username FROM `items` INNER JOIN accounts ON items.buyerid=accounts.uid WHERE items.rating > 0 AND items.uid = '$uid' ORDER BY items.id DESC LIMIT $limitlow, $limithigh;";
    $result = mysqli_query($conn,$query) or die(mysqli_error($conn));
    if(mysqli_num_rows($result) > 0) {
      while($row = $result->fetch_assoc())
        $ratingdata[] = $row;
      $data[] = $ratingdata;
    }
    echo json_encode(['data' => $data]);
  } else echo json_encode("Няма открит потребител");
?>