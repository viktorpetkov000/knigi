<?php
	session_start();
  if (isset($_SESSION['uid']))
		echo json_encode($_SESSION['uid']);
	else
		echo json_encode(false);
?>