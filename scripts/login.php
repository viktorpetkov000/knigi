<?php
	session_start();
	include('db.php');
	$email = "";
	$password = "";
	if (isset($_POST['email']))
		$email = $_POST['email'];
	if (isset($_POST['password']))
		$password = $_POST['password'];

	if ($email != "" && $password != "") {
		if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$checkUser = "SELECT * FROM `accounts` WHERE `email` = '$email'";
			$checkUserStatus = mysqli_query($conn,$checkUser) or die(mysqli_error($conn));
			if (mysqli_num_rows($checkUserStatus) > 0) {
				$getSalt = "SELECT * FROM `accounts` WHERE `email` = '$email'";
				$getSaltStatus = mysqli_query($conn,$getSalt) or die(mysqli_error($conn));
				$getSaltRow = mysqli_fetch_assoc($getSaltStatus);
				$salt = $getSaltRow['salt'];
				$dbPassword = $getSaltRow['password'];
				$uid = $getSaltRow['uid'];
				$admin = $getSaltRow['isadmin'];
				$banned = $getSaltRow['banned'];
				$ePassword = md5(md5($password).$salt);
				if ($ePassword == $dbPassword) {
					if (!$banned) {
						$_SESSION['uid'] = $uid;
						if ($admin > 0)
							$_SESSION['admin'] = true;
						echo "Успешен вход.";
					} else echo "Профилът ви е деактивиран.";
				} else echo "Грешна парола.";
			} else echo "Неуспешен вход.";
		} else echo "Невалиден имейл.";
		} else echo "Моля попълнете всички полета.";
?>