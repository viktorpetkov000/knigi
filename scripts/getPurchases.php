<?php
	session_start();
	include('db.php');
	$data = [];
  $uid = "";
  if (isset($_SESSION['uid']))
    $uid = $_SESSION['uid'];
  $page = 0;
	if (isset($_POST['page']))
		$page = intval($_POST['page']);
	$limithigh = 5;
	$limitlow = 5*$page;

  if ($uid) {
    $query = "SELECT * FROM `items` WHERE buyerid = '$uid' AND ended = 1 ORDER BY id DESC LIMIT $limitlow, $limithigh;";
    $result = mysqli_query($conn,$query) or die(mysqli_error($conn));
    if(mysqli_num_rows($result) > 0) {
      while($row = $result->fetch_assoc())
        $data[] = $row;
      echo json_encode(['data' => $data]);
    }
    else
      echo json_encode(false);
  } else echo json_encode("Не сте в профила си");
?>