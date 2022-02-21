function viewItem(id) {
  formData = new FormData;
  formData.append('id', id);
	$.ajax({
		type: "POST",
		url: 'scripts/getItem.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result) {
				$("#item-window-form").html(`
				<div class="item-window-container">
					<div class="item-window-topbar">
						<div class="item-window-return">
							<img src="./assets/return.png" class="item-window-return-button"/>
							<span class="item-window-topbar-text">Обратно</span>
						</div>
						<div class="item-window-save">
							<img src="./assets/save.png" class="item-window-save-button"/>
							<span class="item-window-topbar-text">Запази офертата</span>
						</div>
						<div class="item-window-cat">
							<img src="./assets/cat-1.png" class="item-window-cat-button"/>
							<span class="item-window-topbar-text item-window-topbar-text-cat">Категория</span>
						</div>
					</div>
					<div class="item-window-row">
						<div class="item-window-images">
							<div class="item-window-image-main">
								<img src="./assets/save.png" class="item-window-image-main-image"/>
							</div>
							<div class="carousel-window">
							</div>
						</div>
						<div class="item-window-info1">
							<div class="item-window-info1-title">
								<span class="item-window-info1-title-text">Мед и Мляко - Иван Вазов - 1905г</span>
							</div>
							<div class="item-window-info1-description">
								<span class="item-window-info1-description-text-title">Описание:</span>
								<img src="./assets/separator.png"/>
								<span class="item-window-info1-description-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur vestibulum nunc consequat eget morbi nisl. Odio nulla turpis in lacus vel in. Tincidunt sed nulla habitant turpis tempor elementum purus nullam posuere. Leo vitae nam et, massa quam tempor sit nullam posuere. Aenean lacus libero adipiscing laoreet porttitor elit. Velit dictum erat nunc, adipiscing pulvinar cras a. A, habitant et pellentesque id dignissim egestas. Est arcu curabitur neque, quis commodo, sit suspendisse nibh</span>
							</div>
							<div class="item-window-info1-combine">
								<div class="item-window-info1-specs">
									<span class="item-window-info1-description-text-title">Характеристики:</span>
									<img src="./assets/separator.png"/>
									<span class="item-window-info1-spec-text">
										Автор: <span class="item-window-info1-spec-author item-window-info1-spec-text2">Иван Вазов</span>
										<br>
										Издател: <span class="item-window-info1-spec-publisher item-window-info1-spec-text2">Сиела</span>
										<br>
										Година: <span class="item-window-info1-spec-year item-window-info1-spec-text2">1905</span>
										<br>
										Обем: <span class="item-window-info1-spec-size item-window-info1-spec-text2">210 стр.</span>
										<br>
									</span>
								</div>
								<div class="item-window-info1-condition">
									<span class="item-window-info1-description-text-title">Състояние:</span>
									<img src="./assets/separator.png"/>
									<span class="item-window-info1-description-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur vestibulum nunc consequat eget morbi nisl. Odio nulla turpis in lacus vel in. Tincidunt sed nulla habitant turpis tempor elementum purus nullam posuere. </span>
								</div>
							</div>
						</div>
						<div class="item-window-info2">
							<div class="item-window-info2-price">
								<span class="item-window-info2-price-text">35.90</span>
								<span class="item-window-info2-price-text2">BGN</span>
							</div>
							<div class="item-window-info2-contact">
								<span class="item-window-info2-contact-text">СВЪРЖИ СЕ С ТЪРГОВЕЦА</span>
								<img src="./assets/contact.png" class="item-window-info2-contact-image"/>
							</div>
							<div class="item-window-info2-profile">
								
							</div>
						</div>
					</div>
				</div>
				`);
				var $carouselWindow = $('.carousel-window').flickity({
					initialIndex: 0,
					wrapAround: true,
					cellSelector: '.item-window-image-cell'
				});
				let item = `<div class="item-window-image-cell"><img src="./assets/save.png" class="item-window-image"/></div>`
				$carouselWindow.flickity('append', $(item));
				$carouselWindow.flickity('append', $(item));
				$carouselWindow.flickity('append', $(item));
				$carouselWindow.flickity('append', $(item));
				$("#item-window").modal('show');
				let timer = setTimeout(resize, 200);
				function resize() {
					$carouselWindow.flickity('resize')
					clearTimeout(timer);
				}
      } else showMessage("Няма такава продажба.");
    },
	});
}