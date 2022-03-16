<?php
	session_start();
	include('./db.php');
	$target_dir = "../files/";
	$title = "";
	$author = "";
	$descr = "";
	$price = "";
	$category = "";
	$subcategory = "";
	$subcategory2 = "";
	$condit = "";
	$uid = "";
	$size_flag = false;
	$type_flag = false;
	$image_success = false;
	$query_success = false;

	date_default_timezone_set('Europe/Sofia');
	$date = date("Y/m/d - h:i");
	if (isset($_POST['title']))
		$title = $_POST['title'];
	if (isset($_POST['author']))
		$author = $_POST['author'];
	if (isset($_POST['descr']))
		$descr = $_POST['descr'];
	if (isset($_POST['price']))
		$price = $_POST['price'];
	if (isset($_POST['category']))
		$category = $_POST['category'];
	if (isset($_POST['subcategory']))
		$subcategory = $_POST['subcategory'];
	if (isset($_POST['subcategory2']))
		$subcategory2 = $_POST['subcategory2'];
	if (isset($_POST['condit']))
		$condit = $_POST['condit'];
	if (isset($_SESSION['uid']))
		$uid = $_SESSION['uid'];

	if ($uid) {
		if ($title != "" && $descr != "" && $price != "" && $descr != "" && $condit != "") {
			if (isset($_FILES['files'])) {
				$file_count = count($_FILES['files']['name']);
				$files_arr = array();
				for ($i = 0; $i < $file_count; $i++) {
					$prefix = uniqid("img_");
					$_FILES['files']['name'][$i] = $prefix.$_FILES['files']['name'][$i];
					$file = $_FILES['files']['name'][$i];
					$file_temp = $_FILES['files']['tmp_name'][$i];
					$file_size = $_FILES["files"]["size"][$i];
					$target_file = $target_dir . $file;
					$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
					if ($file_size > 250000)
						$size_flag = true;
					if (!($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
					&& $imageFileType != "gif"))
						$type_flag = false;
					if (!$size_flag) {
						if(!$type_flag) {
							if (move_uploaded_file($file_temp, $target_file)) {
								$image_success = true;
							}
							else echo "Проблем с качването на файлът.";
						} else echo "Позволени формати: JPG, JPEG, PNG, GIF.";
					} else echo "Размерът на снимката трябва да е под 5MB.";
				}
				if ($image_success) {
					$query = "INSERT INTO items(`title`,`author`,`price`,`descr`,`category`,`subcategory`,`subcategory2`,`condit`,`uid`,`startdate`)
					VALUES('$title','$author','$price','$descr','$category','$subcategory','$subcategory2', '$condit', '$uid', '$date')";
					$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
					$query_success = true;
				}
				
				if ($query_success) {
					$id = mysqli_insert_id($conn);
					for ($i = 0; $i < $file_count; $i++) {
						$file = $_FILES['files']['name'][$i];
						$query = "INSERT INTO images(`iid`,`name`) VALUES('$id','$file')";
						$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
					}
					if ($result) {
						$image = $_FILES['files']['name'][0];
						$query = "UPDATE items SET image = '$image' WHERE id = '$id'";
						$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
					}
					if ($result)
						echo "Успешно създаване.";
				}
			} else echo "Не е прикачена снимка.";
		} else echo "Моля попълнете всички полета.";
	} else echo "Не сте влезли в профила си.";
?>