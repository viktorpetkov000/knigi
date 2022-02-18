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
					<div class="item-window-images">
						<div class="item-window-images-outer">
							<div class="item-window-images-inner">
								<div class="carousel-window">
								</div>
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
				$carouselWindow.flickity( 'select', 0);
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