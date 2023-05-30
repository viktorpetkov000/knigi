<?php
	include('templates/default.php');
?>
		<div class="main-container">
			<div class="category-container">
				<div class="category-menu">
					<a href="./categories.php?cat=0&page=0">
						<div class="cat-item cat-item-first">
							<span class="cat-transition"></span>
							<img src="./assets/cat-1.png" class="cat-icon cat-1">
							<img src="./assets/line.png" class="cat-line">
							<span class="cat-name">Художествена литература</span>
						</div>
					</a>
					<a href="./categories.php?cat=1&page=0">
						<div class="cat-item">
							<img src="./assets/cat-2.png" class="cat-icon cat-2">
							<img src="./assets/line.png" class="cat-line">
							<span class="cat-name">Географски, военни и други</span>
						</div>
					</a>
					<a href="./categories.php?cat=2&page=0">
						<div class="cat-item">
							<img src="./assets/cat-3.png" class="cat-icon cat-3">
							<img src="./assets/line.png" class="cat-line">
							<span class="cat-name">Картички, пликове за писма, марки</span>
						</div>
					</a>
					<a href="./categories.php?cat=3&page=0">
						<div class="cat-item">
							<img src="./assets/cat-4.png" class="cat-icon cat-4">
							<img src="./assets/line.png" class="cat-line">
							<span class="cat-name">Стари снимки и портрети</span>
						</div>
					</a>
					<a href="./categories.php?cat=4&page=0">
						<div class="cat-item">
							<img src="./assets/cat-5.png" class="cat-icon cat-5">
							<img src="./assets/line.png" class="cat-line">
							<span class="cat-name">Книжни пари, стари лични и банкови документи</span>
						</div>
					</a>
					<a href="./categories.php?cat=5&page=0">
						<div class="cat-item">
							<img src="./assets/cat-6.png" class="cat-icon cat-6">
							<img src="./assets/line.png" class="cat-line">
							<span class="cat-name">Грамофонни плочи, касети, дискове</span>
						</div>
					</a>
				</div>
			</div>
			<div class="latest-items-container-outer">
				<span class="latest-items-header">Последно добавени</span>
				<div class="latest-items-container-inner">
					<div class="carousel">
					</div>
				</div>
			</div>
			<div class="main-info-container">
				<div class="main-info">
					<h1 class="main-info-header">Ние сме възможно най-добрите!</h1>
					<br>
					<span class="main-info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
						Arcu sed sed orci, tempor, praesent. Tellus integer volutpat et dolor, porta imperdiet. 
						Ipsum phasellus lorem eu tincidunt duis sagittis, adipiscing a fermentum. Vel orci, velit dictumst at ligula.
						<br><br>
						Leo ut libero urna nullam sed tortor, cursus. Commodo gravida quis pellentesque tempus. Penatibus nullam integer 
						donec habitasse pellentesque. Malesuada tincidunt dignissim in sit ullamcorper massa ullamcorper. 
						Proin enim at commodo at donec quisque commodo vel.
					</span>
				</div>
				<img class="main-info-picture" src="assets/books4.png">
				</div>
			</div>
		</div>
		<?php include "templates/footer.php"; ?>
	</body>
</html>