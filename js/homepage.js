$(function() {
	function getLatest() {
		$.ajax({
			type: "POST",
			url: 'scripts/getLatestItems.php',
			cache: false,
			contentType: false,
			processData: false,
			dataType: 'json',
			data: [],
			success: function(result) {
				if (result) {
					for (let i = 0; i < result.items.length; i++) {
						loadLatest(result.items[i].id, result.items[i].image, result.items[i].title, result.items[i].price, result.items[i].descr, result.items.length, 4);
					}
				} else
					showMessage("Няма открити резултати.");
			},
		});
	}
	
	function loadLatest(id, image, title, price, description, length, type) {
		var $carousel = $('.carousel').flickity({
			initialIndex: 5,
			wrapAround: true
		});
		let item =
		`<div id="latest-article-view" class="carousel-cell carousel-cell-` + id + `">
			<div class="new-item-container-inner">
				<img class="new-item-image" src="files/` + image + `">
				<div class="new-item-title">` + title + `</div>
				<div class="new-item-price">` + price + `<span class="bgn">` + " EUR"+ `</span></div>
			</div>
		</div>`
		$carousel.flickity( 'append', $(item));
		$carousel.flickity( 'select', 4);
		$(document).off('click','.carousel-cell-' + id);
		$(document).on('click','.carousel-cell-' + id, function(){
      viewItem(id);
    });
	}
	
  getLatest();
});