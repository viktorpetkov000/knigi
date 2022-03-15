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
          for (let i = 0; i < result.items.length; i++) {
            $(".cat-main-items").append(
              `<div class="cat-main-item">
                <div class="cat-main-item-slider slider-` + i + `">
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
            let formData = new FormData();
            formData.append('id', parseInt(result.items[i].id))
            $.ajax({
              type: "POST",
              url: 'scripts/getImages.php',
              cache: false,
              contentType: false,
              processData: false,
              dataType: 'json',
              data: formData,
              success: function(result) {
                if (result) {
                  console.log(result);
                  var $itemCarousel = $('.slider-' + i).flickity({
                    initialIndex: 0,
                    wrapAround: false,
                    cellSelector: '.item-image-cell'
                  });
                  for (i = 0; i < result.items.length; i++) {
                    
                    let itemImage = `<div class="item-image-cell"><img src="./files/` + result.items[i].name + `" class="item-image-cat"/></div>`
                    $itemCarousel.flickity('append', $(itemImage));
                  }
                } else {
                  showMessage("Няма открити резултати.");
                }
              },
            });
          }
					window.history.replaceState(null, null, "?cat=" + id + "&page=" + result.page + "");
          for (let i = 0; i < categories.sub[id].length; i++)
            subCategories += `<label class="b-contain"><input type="radio" name="radio-cat" id="sub-` + i + `" value="` + i + `" onclick="searchSubCategories(` + i + `, ` + id + `, 0)"><div class="b-input"></div><span class="cat-sort-option-text">` + categories.sub[id][i] + `</span></span></label>`;
          $(".cat-year-list").html(subCategories);
				} else {
					showMessage("Няма открити резултати.");
				}
			},
		});
	}
}

function searchSubCategories(id, mainId, page) {
  console.log('test');
  let subCategories2 = ``
	if (page >= 0) {
		let formData = new FormData();
		formData.append('category', mainId)
    formData.append('subCategory', id)
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
          for (let i = 0; i < result.items.length; i++) {
            $(".cat-main-items").append(
              `<div class="cat-main-item">
                <div class="cat-main-item-slider slider-` + i + `">
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
            let formData = new FormData();
            formData.append('id', parseInt(result.items[i].id))
            $.ajax({
              type: "POST",
              url: 'scripts/getImages.php',
              cache: false,
              contentType: false,
              processData: false,
              dataType: 'json',
              data: formData,
              success: function(result) {
                if (result) {
                  console.log(result);
                  var $itemCarousel = $('.slider-' + i).flickity({
                    initialIndex: 0,
                    wrapAround: false,
                    cellSelector: '.item-image-cell'
                  });
                  for (i = 0; i < result.items.length; i++) {
                    let itemImage = `<div class="item-image-cell"><img src="./files/` + result.items[i].name + `" class="item-image-cat"/></div>`
                    $itemCarousel.flickity('append', $(itemImage));
                  }
                } else {
                  showMessage("Няма открити резултати.");
                }
              },
            });
          }
					window.history.replaceState(null, null, "?cat=" + mainId +"&subcat=" + id + "&page=" + result.page + "");
          for (let i = 0; i < categories.sub2[mainId][id].length; i++)
            subCategories2 += `<label class="b-contain"><input type="radio" name="radio-cat-2" id="sub2-` + i + `" value="` + i + `" onclick="searchSubCategories2(` + i + `,` + id + `,` + mainId + `,0)"><div class="b-input"></div><span class="cat-sort-option-text">` + categories.sub2[mainId][id][i] + `</span></span></label>`;
          $(".cat-subcat-list").html(subCategories2);
				} else {
					showMessage("Няма открити резултати.");
				}
			},
		});
	}
}

function searchSubCategories2(id, subId, mainId, page) {
	if (page >= 0) {
		let formData = new FormData();
		formData.append('category', mainId)
    formData.append('subCategory', subId)
    formData.append('subCategory2', id)
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
          for (let i = 0; i < result.items.length; i++) {
            $(".cat-main-items").append(
              `<div class="cat-main-item">
                <div class="cat-main-item-slider slider-` + i + `">
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
            let formData = new FormData();
            formData.append('id', parseInt(result.items[i].id))
            $.ajax({
              type: "POST",
              url: 'scripts/getImages.php',
              cache: false,
              contentType: false,
              processData: false,
              dataType: 'json',
              data: formData,
              success: function(result) {
                if (result) {
                  console.log(result);
                  var $itemCarousel = $('.slider-' + i).flickity({
                    initialIndex: 0,
                    wrapAround: false,
                    cellSelector: '.item-image-cell'
                  });
                  for (i = 0; i < result.items.length; i++) {
                    let itemImage = `<div class="item-image-cell"><img src="./files/` + result.items[i].name + `" class="item-image-cat"/></div>`
                    $itemCarousel.flickity('append', $(itemImage));
                  }
                } else {
                  showMessage("Няма открити резултати.");
                }
              },
            });
          }
					window.history.replaceState(null, null, "?cat=" + mainId + "&subcat=" + subId + "&subcat2=" + id + "&page=" + result.page + "");
				} else {
					showMessage("Няма открити резултати.");
				}
			},
		});
	}
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
      searchSubCategories2(getUrlParameter('subcat2'), getUrlParameter('subcat'), getUrlParameter('cat'), getUrlParameter('page'));
      let subCategories = '';
      for (let i = 0; i < categories.sub[getUrlParameter('cat')].length; i++)
        subCategories += `<label class="b-contain"><input type="radio" name="radio-cat" id="sub-` + i + `" value="` + i + `" onclick="searchSubCategories(` + i + `, ` + getUrlParameter('cat') + `, 0)"><div class="b-input"></div><span class="cat-sort-option-text">` + categories.sub[getUrlParameter('cat')][i] + `</span></span></label>`;
      $(".cat-year-list").html(subCategories);
      $("#sub-" + getUrlParameter('subcat')).prop("checked", true);
      let subCategories2 = '';
      for (let i = 0; i < categories.sub2[getUrlParameter('cat')][getUrlParameter('subcat')].length; i++)
        subCategories2 += `<label class="b-contain"><input type="radio" name="radio-cat-2" id="sub2-` + i + `" value="` + i + `" onclick="searchSubCategories2(` + i + `, ` + getUrlParameter('subcat') + `, ` + getUrlParameter('cat') + `, 0)"><div class="b-input"></div><span class="cat-sort-option-text">` + categories.sub2[getUrlParameter('cat')][getUrlParameter('subcat')][i] + `</span></span></label>`;
      $(".cat-subcat-list").html(subCategories2);
      $("#sub2-" + getUrlParameter('subcat2')).prop("checked", true);
    }
    else if (typeof getUrlParameter('subcat') !== 'undefined') {
      searchSubCategories(getUrlParameter('subcat'), getUrlParameter('cat'), getUrlParameter('page'));
      let subCategories = '';
      for (let i = 0; i < categories.sub[getUrlParameter('cat')].length; i++)
        subCategories += `<label class="b-contain"><input type="radio" name="radio-cat" id="sub-` + i + `" value="` + i + `" onclick="searchSubCategories(` + i + `, ` + getUrlParameter('cat') + `, 0)"><div class="b-input"></div><span class="cat-sort-option-text">` + categories.sub[getUrlParameter('cat')][i] + `</span></span></label>`;
      $(".cat-year-list").html(subCategories);
      $("#sub-" + getUrlParameter('subcat')).prop("checked", true);
    }
    else if (typeof getUrlParameter('cat') !== 'undefined') {
      searchCategories(getUrlParameter('cat'), getUrlParameter('page'));
    }
  } else {
    console.log("test4");
      searchCategories(0,0);
  }

});