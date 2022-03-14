let items = 0;

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


function getArticles() {
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

function loadArticles(id, image, title, price) {
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

function searchCategories(id, page) {
  console.log(id);
  console.log(page);
  $(".cat-header-text").html(categories.main[id]);
  let subCategories = ``
	if (page >= 0) {
		let formData = new FormData();
		formData.append('category', id)
		formData.append('page', parseInt(page))
		$.ajax({
			type: "POST",
			url: 'scripts/searchCategories.php',
			cache: false,
			contentType: false,
			processData: false,
			dataType: 'json',
			data: formData,
			success: function(result) {
				if (result) {
          console.log(result);
          $(".cat-main-items").empty();
					items = 0;
					// for (let i = 0; i < result.items.length; i++)
					// 	loadItem(result.items[i].id, result.items[i].image, result.items[i].title, result.items[i].price, result.items[i].descr, result.items.length, 1);
					// $("#catList").empty();
					// $("#back-cat").remove();
					// $("#catTitle").prepend(`<i class="fas fa-arrow-left" id="back-cat" onclick="loadMainCategoriesPre()"></i>`);
					// $('#search-input').val('')
					// $("#catList").removeAttr("main");
					// $("#catList").removeAttr("sub");
					// $("#catList").removeAttr("sub2");
					// $("#catList").attr('main', id);
					// $("#items-center").attr('page', result.page);
					// $("#items-center").attr('subcat2', 0);
					// $("#items-center").attr('subcat', 0);
					// $("#items-center").attr('cat', id);
          for (let i = 0; i < result.items.length; i++)
          $(".cat-main-items").append(
            `<div class="cat-main-item">
              <div class="cat-main-item-slider">
              </div>
              <div class="cat-main-item-middle">
                <span class="cat-main-item-title">` + result.items[i].title + `</span>
                <div class="cat-main-item-info-segment2">
                  <div class="cat-main-item-info">
                    <div class="cat-main-item-info-segment">
                      <img src="./assets/userpic.png" class="cat-main-item-icon">
                      <span class="cat-main-item-username">` + result.items[i].username + `</span>
                    </div>
                    <div class="cat-main-item-info-segment">
                      <img src="./assets/location.png" class="cat-main-item-icon">
                      <span class="cat-main-item-location">` + "Локация" + `</span>
                    </div>
                    <div class="cat-main-item-info-segment">
                      <img src="./assets/time.png" class="cat-main-item-icon">
                      <span class="cat-main-item-time">` + result.items[i].startdate + `</span>
                    </div>
                  </div>
                  <span class="cat-main-item-description">` + result.items[i].descr + `</span>
                </div>
              </div>
              <div class="cat-main-item-price-container">
                <span class="cat-main-item-price">` + result.items[i].price + `</span>
                <span class="cat-main-item-price-bgn">BGN</span>
                <div class="cat-main-item-open-button" onclick="viewItem(` + result.items[i].id + `)">
                  <img src="./assets/magnifier.png" class="cat-main-item-open-image"></span>
                  <span class="cat-main-item-open-text">отвори</span>
                </div>
              </div>
            </div>`);
					window.history.replaceState(null, null, "?cat=" + id + "&page=" + result.page + "");
          for (let i = 0; i < categories.main.length; i++)
            subCategories += `<label class="b-contain" onclick="searchSubCategories2()"><input type="radio" name="radio-cat" value="` + i + `"><div class="b-input"></div><span class="cat-sort-option-text">` + categories.sub[id][i] + `</span></span></label>`;
          $(".cat-year-list").html(subCategories);
				} else {
					showMessage("Няма открити резултати.");
				}
			},
		});
	}
}

function searchSubCategories2() {
  console.log(test);
}

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
};

$(function() {
  $(".js-range-slider-price").ionRangeSlider({
    skin: "big"
  });
  $(".js-range-slider-size").ionRangeSlider({
    skin: "big"
  });
  getTopArticles();
  if (getUrlParameter('page') && getUrlParameter('cat')) {
    if (typeof getUrlParameter('subcat2') !== 'undefined') {
      searchCategories(getUrlParameter('cat'));
      searchSubCategories(getUrlParameter('subcat'), getUrlParameter('cat'), getUrlParameter('page'));
      searchSubCategories2(getUrlParameter('subcat2'), getUrlParameter('subcat'), getUrlParameter('cat'), getUrlParameter('page'));
    }
    else if (typeof getUrlParameter('subcat') !== 'undefined') {
      searchCategories(getUrlParameter('cat'), getUrlParameter('page'));
      searchSubCategories(getUrlParameter('subcat'), getUrlParameter('cat'), getUrlParameter('page'));
    }
    else if (typeof getUrlParameter('cat') !== 'undefined')
      searchCategories(getUrlParameter('cat'), getUrlParameter('page'));
  } else
      searchCategories(0,0);
});