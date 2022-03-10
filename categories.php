<?php
	session_start();
	include('scripts/db.php');
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Книги</title>
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
							<span class="cat-sort-title-text">Период на издаване:</span>
							<img src="./assets/lines.png" class="cat-sort-title-img">
						</div>
						<label class="b-contain"><input type="checkbox" name="checkbox-year-1" value="1"><div class="b-input"></div><span class="cat-sort-option-text">1800-1900 г.</span></span></label>
						<label class="b-contain"><input type="checkbox" name="checkbox-year-2" value="2"><div class="b-input"></div><span class="cat-sort-option-text">1901-1915 г.</span></label>
						<label class="b-contain"><input type="checkbox" name="checkbox-year-3" value="3"><div class="b-input"></div><span class="cat-sort-option-text">1916-1939 г.</span></label>
						<label class="b-contain"><input type="checkbox" name="checkbox-year-4" value="4"><div class="b-input"></div><span class="cat-sort-option-text">1940-1950 г.</span></label>
						<label class="b-contain"><input type="checkbox" name="checkbox-year-5" value="5"><div class="b-input"></div><span class="cat-sort-option-text">1951-1970 г.</span></label>
						<label class="b-contain"><input type="checkbox" name="checkbox-year-6" value="6"><div class="b-input"></div><span class="cat-sort-option-text">1971-2000 г.</span></label>
						<label class="b-contain"><input type="checkbox" name="checkbox-year-7" value="7"><div class="b-input"></div><span class="cat-sort-option-text">Съвременни</span></label>
					</div>
					<div class="cat-subcat-container">
						<div class="cat-sort-title">
							<img src="./assets/lines.png" class="cat-sort-title-img">
							<span class="cat-sort-title-text">Други категории:</span>
							<img src="./assets/lines.png" class="cat-sort-title-img">
						</div>
						<label class="b-contain"><input type="checkbox" name="checkbox-cat-1" value="1"><div class="b-input"></div><span class="cat-sort-option-text">1800-1900 г.</span></span></label>
						<label class="b-contain"><input type="checkbox" name="checkbox-cat-2" value="2"><div class="b-input"></div><span class="cat-sort-option-text">1901-1915 г.</span></label>
						<label class="b-contain"><input type="checkbox" name="checkbox-cat-3" value="3"><div class="b-input"></div><span class="cat-sort-option-text">1916-1939 г.</span></label>
						<label class="b-contain"><input type="checkbox" name="checkbox-cat-4" value="4"><div class="b-input"></div><span class="cat-sort-option-text">1940-1950 г.</span></label>
						<label class="b-contain"><input type="checkbox" name="checkbox-cat-5" value="5"><div class="b-input"></div><span class="cat-sort-option-text">1951-1970 г.</span></label>
						<label class="b-contain"><input type="checkbox" name="checkbox-cat-6" value="6"><div class="b-input"></div><span class="cat-sort-option-text">1971-2000 г.</span></label>
						<label class="b-contain"><input type="checkbox" name="checkbox-cat-7" value="7"><div class="b-input"></div><span class="cat-sort-option-text">Съвременни</span></label>
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
						<div class="cat-main-item">
							<div class="cat-main-item-slider"></div>
							<div class="cat-main-item-middle">
								<span class="cat-main-item-title">Мед и мляко - Иван Вазон 1905 г.</span>
								<div class="cat-main-item-info-segment2">
									<div class="cat-main-item-info">
										<div class="cat-main-item-info-segment">
											<img src="./assets/userpic.png" class="cat-main-item-icon">
											<span class="cat-main-item-username">Venko_Milinkov85</span>
										</div>
										<div class="cat-main-item-info-segment">
											<img src="./assets/location.png" class="cat-main-item-icon">
											<span class="cat-main-item-location">Павликени</span>
										</div>
										<div class="cat-main-item-info-segment">
											<img src="./assets/time.png" class="cat-main-item-icon">
											<span class="cat-main-item-time">Днес 05:50</span>
										</div>
									</div>
									<span class="cat-main-item-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis auctor tincidunt dignissim dictumst integer ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit ...</span>
								</div>
							</div>
							<div class="cat-main-item-price-container">
								<span class="cat-main-item-price">35.90</span>
								<span class="cat-main-item-price-bgn">BGN</span>
								<div class="cat-main-item-open-button" onclick="viewItem(id)">
									<img src="./assets/magnifier.png" class="cat-main-item-open-image"></span>
									<span class="cat-main-item-open-text">отвори</span>
								</div>
							</div>
						</div>
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
