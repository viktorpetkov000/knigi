<?php
	session_start();
	include('scripts/db.php');
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Книги</title>
		<meta charset="UTF-8">
		<meta name="description" content="Купувай и продавай - онлайн">
		<meta name="keywords" content="Книги, knigi, books">
		<meta name="author" content="Viktor Petkov">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Yanone+Kaffeesatz:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<link rel="stylesheet" href="css/snackbar.css">
		<link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css">
		<link rel="stylesheet" href="css/style.css">		
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.3.1/css/ion.rangeSlider.min.css"/>
		<script src="https://code.iconify.design/2/2.0.4/iconify.min.js"></script>
		<script src="js/jquery.js"></script>
		<script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.5.3/umd/popper.min.js" integrity="sha512-53CQcu9ciJDlqhK7UD8dZZ+TF2PFGZrOngEYM/8qucuQba+a+BXOIRsp9PoMNJI3ZeLMVNIxIfZLbG/CdHI5PA==" crossorigin="anonymous"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/showMessage.js"></script>
		<script src="js/menu.js"></script>
		<script src="js/main.js"></script>
		<script src="js/message.js"></script>
		<script src="js/loadMain.js"></script>
		<script src="js/categories.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.3.1/js/ion.rangeSlider.min.js"></script>
	</head>
	<body class="cat-body">
		<div class="cat-bg"></div>
		<div class="cat-bg2"></div>
		<div id="snackbar"></div>
		<nav class="navbar navbar-expand-md navbar-dark">
			<a class="navbar-brand" href="/knigi2"></a>
			<button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#menuLogin" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="menuLogin"></div>
		</nav>
		<div class="modal fade" id="window" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h4 id="windowTitle"></h4>
					</div>
					<div class="modal-body" id="windowForm"></div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="item-window" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered item-window-dialog" role="document">
				<div class="modal-content">
					<div class="modal-body" id="item-window-form"></div>
				</div>
			</div>
		</div>
		<div class="main-container">
      <div class="cat-header-center">
        <div class="cat-header-border">
          <div class="cat-header-container">
            <span class="cat-header-text">Географски, военни и други карти и афиши</span>
          </div>
          <div class="cat-header-image-container">
            <img src="assets/dots.png" class="cat-header-image"/>
          </div>
        </div>
      </div>
			<div class="cat-container">
				<div class="cat-settings-container">
					<div class="cat-sort-container">
						<div class="cat-sort-title">
							<img src="./assets/lines.png" class="cat-sort-title-img">
							<span class="cat-sort-title-text">Подреди по:</span>
							<img src="./assets/lines.png" class="cat-sort-title-img">
						</div>
						<div class="cat-sort-options">
							<label class="b-contain"><input type="radio" id="desc" class="desc" name="sort"><div class="b-input"></div><span class="cat-sort-option-text">цена низходяща</span></label>
							<label class="b-contain"><input type="radio" id="asc" class="asc" name="sort"><div class="b-input"></div><span class="cat-sort-option-text">цена възходяща</span></label>
							<label class="b-contain"><input type="radio" id="new" class="new" name="sort"><div class="b-input"></div><span class="cat-sort-option-text">най-нови</span></label>
							<label class="b-contain"><input type="radio" id="popular" class="popular" name="sort"><div class="b-input"></div><span class="cat-sort-option-text">най-популярни</span></label>
						</div>
					</div>
					<div class="cat-price-container">
						<div class="cat-sort-title">
							<img src="./assets/lines.png" class="cat-sort-title-img">
							<span class="cat-sort-title-text">Цена:</span>
							<img src="./assets/lines.png" class="cat-sort-title-img">
						</div>
						<input type="text" class="js-range-slider-price" name="my_range" value=""/>
					</div>
					<div class="cat-size-container">
						<div class="cat-sort-title">
							<img src="./assets/lines.png" class="cat-sort-title-img">
							<span class="cat-sort-title-text">Обем:</span>
							<img src="./assets/lines.png" class="cat-sort-title-img">
						</div>
						<input type="text" class="js-range-slider-size" name="my_range" value=""/>
					</div>
					<div class="cat-year-container">
						<div class="cat-sort-title">
							<img src="./assets/lines.png" class="cat-sort-title-img">
							<span class="cat-sort-title-text">Други категории</span>
							<img src="./assets/lines.png" class="cat-sort-title-img">
						</div>
						<div class="cat-year-list">
						</div>
					</div>
					<div class="cat-subcat-container">
						<div class="cat-sort-title">
							<img src="./assets/lines.png" class="cat-sort-title-img">
							<span class="cat-sort-title-text">Подкатегории</span>
							<img src="./assets/lines.png" class="cat-sort-title-img">
						</div>
						<div class="cat-subcat-list">
						</div>
					</div>
				</div>
				<div class="cat-main-container">
					<div class="cat-top-articles-outer">
						<div class="cat-top-articles-inner">
							<div class="cat-top-articles-image-container">
								<img src="./assets/stars.png" class="cat-top-articles-image"/>
								<span class="cat-top-articles-text">ТОП АРТИКУЛИ</span>
							</div>
							<div class="cat-top-articles-inner2">
							</div>
						</div>
						<div class="cat-top-articles">
						</div>
					</div>
					<div class="cat-main-separator"></div>
					<div class="cat-main-pages">
					</div>
					<div class="cat-main-items">
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<div class="footer-info">
				<div class="footer-logo">
					<img src="assets/logo2.png"/>
				</div>
				<div class="footer-info2">
					<div class="footer-sitename">knigiknigi.knig</div>
					<div class="footer-copyright">Copyright © 2021 Всички права запазени</div>
				</div>
				<div class="footer-slogan">Най-добрия слоган на света!</div>
			</div>
			<div class="footer-menu">
				<a class="footer-menu-item" href="#">Контакт</a>
				<a class="footer-menu-item" href="#">Услуги</a>
				<a class="footer-menu-item" href="#">Лични данни</a>
				<a class="footer-menu-item" href="#">Политика за използване на бисквитки</a>
			</div>
    </div>
		</div>
	</body>
</html>