<?php
	session_start();
	if(isset($_SESSION['uid'])) {
		if (isset($_SESSION['admin']))
			echo json_encode(['admin' => $_SESSION['admin'], 'uid' => $_SESSION['uid']]);
	else echo json_encode(['uid' => $_SESSION['uid']]);
	} else
		echo json_encode(false);
?>