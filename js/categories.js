function getTopArticles() {
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
          loadTopArticles(result.items[i].id, result.items[i].image, result.items[i].title, result.items[i].price);
        }
      } else
        showMessage("Няма открити резултати.");
    },
  });
}

function loadTopArticles(id, image, title, price) {
  var $carousel = $('.cat-top-articles').flickity({
    initialIndex: 1,
    pageDots: false,
    wrapAround: false,
  });
	let item =
	`<div class="carousel-cell" onClick="viewItem('`+ id + `')">
    <div class="new-item-container-inner">
      <img class="new-item-image" src="files/` + image + `">
      <div class="new-item-title">` + title + `</div>
      <div class="new-item-price">` + price + `<span class="bgn">` + " BGN"+ `</span></div>
    </div>
	</div>`
  $carousel.flickity( 'append', $(item));
  $carousel.flickity( 'select', 0);
}

// `<div class="cat-main-item">
// <div class="cat-main-item-slider"></div>
// <span class="cat-main-item-title">Мед и мляко - Иван Вазон 1905 г.</span>
// <div class="cat-main-item-info">
//   <img src="./assets/userpic.png" class="cat-main-item-icon">
//   <span class="cat-main-item-username">Venko_Milinkov85</span>
//   <img src="./assets/location.png" class="cat-main-item-icon">
//   <span class="cat-main-item-location"></span>
//   <img src="./assets/time.png" class="cat-main-item-icon">
//   <span class="cat-main-item-time"></span>
// </div>
// <span class="cat-main-item-description"></span>
// <div class="cat-main-item-price-container">
//   <span class="cat-main-item-price">35.90</span><br>
//   <span class="cat-main-item-price-bgn">BGN</span>
//   <div class="cat-main-item-open-button">
//     <img src="./assets/magnifier.png" class="cat-main-item-open-image"></span>
//     <span class="cat-main-item-open-text"></span>
//   </div>
// </div>
// </div>`

$(function() {
  $(".js-range-slider-price").ionRangeSlider({
    skin: "big"
  });
  $(".js-range-slider-size").ionRangeSlider({
    skin: "big"
  });
  getTopArticles();
});