<?php
	session_start();
	include('db.php');
	
	$username = "";
	$email = "";
	$password = "";
	$cpassword = "";
	$terms = false;
	$salt = uniqid();

	if (isset($_POST['username']))
		$username = $_POST['username'];
	if (isset($_POST['email']))
		$email = $_POST['email'];
	if (isset($_POST['password']))
		$password = $_POST['password'];
	if (isset($_POST['cpassword']))
		$cpassword = $_POST['cpassword'];
	if (isset($_POST['terms']))
		$terms = $_POST['terms'];

// $hash = md5(rand(0,1000));
$hash = hash("sha256", rand(0,1000));
// $subject = 'Потвърждение на профил';
// $message = '

// Благодаря за регистрацията!
// Вашият профил бе създаден.
  
// Моля използвайте този адрес за да активирате профилът си:
// http://www.knigi.com/?email='.$email.'&code='.$hash.'
// ';
$headers = 'From:noreply@yourwebsite.com' . "\r\n"; // Set from headers
	// $newPassword = md5(md5($password).$salt);
	$newPassword = hash("sha256", hash("sha256", $password).$salt);
	if ($username != "" && $email != "" && $password != "" && $cpassword != "" && $terms == "true") { 
		if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$checkUser = "SELECT * FROM accounts WHERE email = '$email'";
			$checkUserStatus = mysqli_query($conn,$checkUser) or die(mysqli_error($conn));
			if (mysqli_num_rows($checkUserStatus) == 0) {
				$checkUser = "SELECT * FROM accounts WHERE username = '$username'";
				$checkUserStatus = mysqli_query($conn,$checkUser) or die(mysqli_error($conn));
				if (mysqli_num_rows($checkUserStatus) == 0) {
					if ($password == $cpassword) {
						if (strlen($password) >= 8 && preg_match('/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/', $password)) {
							$insertUser = "INSERT INTO accounts(`username`,`email`,`password`,`salt`,`code`,`tax`) VALUES('$username','$email','$newPassword', '$salt', '$hash', 12)";
							$insertUserStatus = mysqli_query($conn,$insertUser) or die(mysqli_error($conn));
							if ($insertUserStatus) {
								//mail($email, $subject, $message, $headers);
								echo "Успешна регистрация.";
							}
							else
								echo "Неуспешна регистрация.";
						} else
							echo "Паролата трябва да е минимум 8 символа и да съдържа поне една цифра и буква";
					} else
							echo "Паролите не съвпадат.";
				} else
					echo "Това потребителско име вече съществува.";
			} else
				echo "Тези имейл вече съществува.";
			} else
				echo "Невалиден имейл.";
		} else
				echo "Моля попълнете всички полета.";
?>