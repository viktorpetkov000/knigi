let items = 0;
let sort = 0;
let priceLow = -1;
let priceHigh = -1;
let priceHighReturn = 0;
let priceLowReturn = 0;
let globalPage = 0;
let lastPage = false;
let titleName = "";

$(function() {
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
          for (let i = 0; i < result.items.length; i++)
            loadTopArticles(result.items[i].id, result.items[i].image, result.items[i].title, result.items[i].price);
        } else
          showMessage("Няма открити резултати.");
          $(".cat-main-items").html("");
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
    `<div id="top-article-view" class="carousel-cell carousel-cell-` + id + `">
      <div class="new-item-container-inner">
        <img class="new-item-image" src="files/` + image + `">
        <div class="new-item-title">` + title + `</div>
        <div class="new-item-price">` + price + `<span class="bgn">` + " EUR"+ `</span></div>
      </div>
    </div>`
    $carousel.flickity( 'append', $(item));
    $carousel.flickity( 'select', 0);
    $(document).off('click','#top-article-view .carousel-cell-' + id)
    $(document).on('click','#top-article-view .carousel-cell-' + id, function(){
      viewItem(id);
    });
  }
  
  function searchCategories(id, page) {
    lastPage = false;
    $(".cat-header-text").html(categories.main[id]);
    let subCategories = ``
    if (page >= 0) {
      let formData = new FormData();
      formData.append('category', id)
      formData.append('page', parseInt(page))
      if (sort)
        formData.append('sort', sort)
      if (priceLow > 0 && priceHigh > 0) {
        formData.append('priceHigh', priceHigh);
        formData.append('priceLow', priceLow);
      }
      if (titleName)
        formData.append('name', titleName)
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
                    <span class="cat-main-item-price-bgn">EUR</span>
                    <div id="cat-item-view-` + result.items[i].id + `" class="cat-main-item-open-button">
                      <img src="./assets/magnifier.png" class="cat-main-item-open-image"></span>
                      <span class="cat-main-item-open-text">отвори</span>
                    </div>
                  </div>
                </div>`);
                priceLowReturn = result.priceLowReturn;
                priceHighReturn = result.priceHighReturn;
                let itemId = result.items[i].id;
                if (result.items.length < 6)
                  lastPage = true;
                $(".js-range-slider-price").data("ionRangeSlider").update({
                  min: priceLowReturn,
                  max: priceHighReturn,
                })
                $(document).off('click','#cat-item-view-' + itemId);
                $(document).on('click','#cat-item-view-' + itemId, function(){
                  viewItem(itemId);
                });
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
                    $(".cat-main-items").html("");
                  }
                },
              });
            }
            window.history.replaceState(null, null, "?cat=" + id + "&page=" + result.page + "");
            for (let i = 0; i < categories.sub[id].length; i++) {
              subCategories += `<label class="b-contain"><input type="radio" name="radio-cat" id="sub-` + i + `" value="` + i + `"><div class="b-input"></div><span class="cat-sort-option-text">` + categories.sub[id][i] + `</span></span></label>`;
              $(document).off('click','#sub-' + i)
              $(document).on('click','#sub-' + i, function(){
                searchSubCategories(i,id,0);
              });
            }
            $(".cat-year-list").html(subCategories);
          } else {
            showMessage("Няма открити резултати.");
            $(".cat-main-items").html("");
          }
        }
      });
    }
  }
  
  function searchSubCategories(id, mainId, page) {
    lastPage = false;
    $(".cat-header-text").html(categories.sub[mainId][id]);
    let subCategories2 = ``
    if (page >= 0) {
      let formData = new FormData();
      formData.append('category', mainId)
      formData.append('subCategory', id)
      formData.append('page', parseInt(page))
      if (sort)
        formData.append('sort', sort)
      if (priceLow > 0 && priceHigh > 0) {
        formData.append('priceHigh', priceHigh);
        formData.append('priceLow', priceLow);
      }
      if (titleName)
        formData.append('name', titleName)
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
                    <span class="cat-main-item-price-bgn">EUR</span>
                    <div id="cat-sub-item-view-` + result.items[i].id + `" class="cat-main-item-open-button">
                      <img src="./assets/magnifier.png" class="cat-main-item-open-image"></span>
                      <span class="cat-main-item-open-text">отвори</span>
                    </div>
                  </div>
                </div>`);
                priceLowReturn = result.priceLowReturn;
                priceHighReturn = result.priceHighReturn;
                $(".js-range-slider-price").data("ionRangeSlider").update({
                  min: priceLowReturn,
                  max: priceHighReturn,
                })
                let fixid = result.items[i].id;
                if (result.items.length < 6)
                  lastPage = true;
                $(document).off('click','#cat-sub-item-view-' + result.items[i].id)
                $(document).on('click','#cat-sub-item-view-' + result.items[i].id, function(){
                  viewItem(fixid);
                });
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
                    $(".cat-main-items").html("");
                  }
                },
              });
            }
            window.history.replaceState(null, null, "?cat=" + mainId +"&subcat=" + id + "&page=" + result.page + "");
            for (let i = 0; i < categories.sub2[mainId][id].length; i++) {
              subCategories2 += `<label class="b-contain"><input type="radio" name="radio-cat-2" id="sub2-` + i + `" value="` + i + `"><div class="b-input"></div><span class="cat-sort-option-text">` + categories.sub2[mainId][id][i] + `</span></span></label>`;
              $(document).off('click','#sub2-' + i)
              $(document).on('click','#sub2-' + i, function(){
                searchSubCategories2(i,id,mainId,0);
              });
            }
            $(".cat-subcat-list").html(subCategories2);
          } else {
            showMessage("Няма открити резултати.");
            $(".cat-main-items").html("");
          }
        },
      });
    }
  }
  
  function searchSubCategories2(id, subId, mainId, page) {
    lastPage = false;
    $(".cat-header-text").html(categories.sub2[mainId][subId][id]);
    if (page >= 0) {
      let formData = new FormData();
      formData.append('category', mainId)
      formData.append('subCategory', subId)
      formData.append('subCategory2', id)
      formData.append('page', parseInt(page))
      if (sort)
        formData.append('sort', sort)
      if (priceLow > 0 && priceHigh > 0) {
        formData.append('priceHigh', priceHigh);
        formData.append('priceLow', priceLow);
      }
      if (titleName)
        formData.append('name', titleName)
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
                    <span class="cat-main-item-price-bgn">EUR</span>
                    <div id="cat-sub2-item-view-` + result.items[i].id + `" class="cat-main-item-open-button">
                      <img src="./assets/magnifier.png" class="cat-main-item-open-image"></span>
                      <span class="cat-main-item-open-text">отвори</span>
                    </div>
                  </div>
                </div>`);
                priceLowReturn = result.priceLowReturn;
                priceHighReturn = result.priceHighReturn;
                $(".js-range-slider-price").data("ionRangeSlider").update({
                  min: priceLowReturn,
                  max: priceHighReturn,
                })
              let fixid2 = result.items[i].id;
              if (result.items.length < 6)
                lastPage = true;
              $(document).off('click','#cat-sub2-item-view-' + result.items[i].id)
              $(document).on('click','#cat-sub2-item-view-' + result.items[i].id, function(){
                viewItem(fixid2);
              });
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
                    $(".cat-main-items").html("");
                  }
                },
              });
            }
            window.history.replaceState(null, null, "?cat=" + mainId + "&subcat=" + subId + "&subcat2=" + id + "&page=" + result.page + "");
          } else {
            showMessage("Няма открити резултати.");
            $(".cat-main-items").html("");
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

  $(".js-range-slider-price").ionRangeSlider({
    skin: "big",
    type: "double",
    min: priceLowReturn,
    max: priceHighReturn,
    onFinish: function (data) {
      priceLow = data.from;
      priceHigh = data.to;
      refreshSearch();
    },
  });

  // $(".js-range-slider-size").ionRangeSlider({
  //   skin: "big"
  // });

  $('input[name="sort"]').change(function() {
    if ($(this).is(':checked')) {
      sort = $(this).val();
      refreshSearch();
    }
  });

  function refreshSearch() {
    if (getUrlParameter('page') && getUrlParameter('cat')) {
      globalPage = getUrlParameter('page');
      if (typeof getUrlParameter('subcat2') !== 'undefined') {
        searchSubCategories2(getUrlParameter('subcat2'), getUrlParameter('subcat'), getUrlParameter('cat'), globalPage);
        let subCategories = '';
        for (let i = 0; i < categories.sub[getUrlParameter('cat')].length; i++) {
          subCategories += `<label class="b-contain"><input type="radio" name="radio-cat" id="sub-` + i + `" value="` + i + `"><div class="b-input"></div><span class="cat-sort-option-text">` + categories.sub[getUrlParameter('cat')][i] + `</span></span></label>`;
          $(document).off('click','#sub-' + i);
          $(document).on('click','#sub-' + i, function(){
            searchSubCategories(i,getUrlParameter('cat'),0)
          });
        }
        $(".cat-year-list").html(subCategories);
        $("#sub-" + getUrlParameter('subcat')).prop("checked", true);
        let subCategories2 = '';
        for (let i = 0; i < categories.sub2[getUrlParameter('cat')][getUrlParameter('subcat')].length; i++) {
          subCategories2 += `<label class="b-contain"><input type="radio" name="radio-cat-2" id="sub2-` + i + `" value="` + i + `"><div class="b-input"></div><span class="cat-sort-option-text">` + categories.sub2[getUrlParameter('cat')][getUrlParameter('subcat')][i] + `</span></span></label>`;
          $(document).off('click','#sub2-' + i);
          $(document).on('click','#sub2-' + i, function(){
            searchSubCategories2(i,getUrlParameter('subcat'),getUrlParameter('cat'),0)
          });
        }
        $(".cat-subcat-list").html(subCategories2);
        $("#sub2-" + getUrlParameter('subcat2')).prop("checked", true);
      }
      else if (typeof getUrlParameter('subcat') !== 'undefined') {
        searchSubCategories(getUrlParameter('subcat'), getUrlParameter('cat'), globalPage);
        let subCategories = '';
        for (let i = 0; i < categories.sub[getUrlParameter('cat')].length; i++) {
          subCategories += `<label class="b-contain"><input type="radio" name="radio-cat" id="sub-` + i + `" value="` + i + `"><div class="b-input"></div><span class="cat-sort-option-text">` + categories.sub[getUrlParameter('cat')][i] + `</span></span></label>`;
          $(document).off('click','#sub-' + i);
          $(document).on('click','#sub-' + i, function(){
            searchSubCategories(i,getUrlParameter('cat'),0)
          });
        }
        $(".cat-year-list").html(subCategories);
        $("#sub-" + getUrlParameter('subcat')).prop("checked", true);
      }
      else if (typeof getUrlParameter('cat') !== 'undefined') {
        searchCategories(getUrlParameter('cat'), globalPage);
      }
    } else {
      searchCategories(0,0);
    }
  }
  $(document).on('click','.cat-main-pages-left-button', function(){
    if (globalPage > 0) {
      globalPage--;
      window.history.replaceState(null, null, window.location.href.replace(/&page=\d+/, "&page=" + globalPage));
      refreshSearch();
    }
    else
      showMessage("Няма предишни страници.");
  });
  $(document).on('click','.cat-main-pages-right-button', function(){
    if (!lastPage) {
      globalPage++;
      window.history.replaceState(null, null, window.location.href.replace(/&page=\d+/, "&page=" + globalPage));
      refreshSearch();
    } else
      showMessage("Няма повече резултати.")
  });

  $(document).on('change','.cat-search-input', function(){
    titleName = this.value;
    refreshSearch();
  });
  getTopArticles();
  refreshSearch();
});