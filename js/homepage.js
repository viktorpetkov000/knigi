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
	`<div class="carousel-cell" onClick="viewItem('`+ id +`', '` + title  + `','` + image + `', '`+ description + `','` + price + `')">
    <div class="new-item-container-inner">
      <img class="new-item-image" src="files/` + image + `">
      <div class="new-item-title">` + title + `</div>
      <div class="new-item-price">` + price + `<span class="bgn">` + " BGN"+ `</span></div>
    </div>
	</div>`
  //$(".latest-items").append(item);
	$carousel.flickity( 'append', $(item));
	$carousel.flickity( 'select', 4);
}

// external js: flickity.pkgd.js




function loadItem(id, image, title, price, description, length, type) {
	items++;
	let colType = 'col-md-3';
	let item =
	`<div class="item-container ` + colType + `" style=""onClick="viewItem('`+ id +`', '` + title  + `','` + image + `', '`+ description + `','` + price + `')">
		<img class="item-image" src="files/` + image + `">
		<div class="item-title">` + title + `</div>
		<div class="item-price">` + price + "лв."+ `</div>
		<div class="item-description">` + description + `</div>
	</div>`
	if (!$("#items-center .row").length)
		$("#items-center").append(`<div class="row" style="	width: 100%;
		margin: auto;" id="row0"></div>`);
	if ($("#row" + rowID).children().length == 4) {
		rowID++;
		$("#items-center").append(`<div class="row" style="	width: 100%;
		margin: auto;" id="row` + rowID + `"></div>`);
	}
	$("#row" + rowID).append(item);
	if (items == length && type == 0) {
		$("#items-center").append(`
			<div id="pages">
				<i class="fas fa-arrow-left" onclick="loadItemList(`+ (parseInt($("#items-center").attr('pagem'))-1) + `)"></i>
				<span id="page">Страница ` + (parseInt($("#items-center").attr('pagem'))+1) + `</span>
				<i class="fas fa-arrow-right" onclick="loadItemList(`+ (parseInt($("#items-center").attr('pagem'))+1) + `)"></i>
			</div>
		`);
	} else if (items == length && type == 1)  {
		$("#items-center").append(`
			<div id="pages">
				<i class="fas fa-arrow-left" onclick="searchCategories(` + $("#items-center").attr('cat') + `,` + (parseInt($("#items-center").attr('page'))-1) + `)"></i>
				<span id="page">Страница ` + (parseInt($("#items-center").attr('page'))+1) + `</span>
				<i class="fas fa-arrow-right" onclick="searchCategories(` + $("#items-center").attr('cat') + `,` + (parseInt($("#items-center").attr('page'))+1) + `)"></i>
			</div>
		`);
	} else if (items == length && type == 2)  {
		$("#items-center").append(`
			<div id="pages">
				<i class="fas fa-arrow-left" onclick="searchSubCategories(` 
				+ $("#items-center").attr('subcat') + ','
				+ $("#items-center").attr('cat') + `,`
				+ (parseInt($("#items-center").attr('page'))-1) + ','
				+ `)"></i>
				<span id="page">Страница ` + (parseInt($("#items-center").attr('page'))+1) + `</span>
				<i class="fas fa-arrow-right" onclick="searchSubCategories(` 
				+ $("#items-center").attr('subcat') + ','
				+ $("#items-center").attr('cat') + `,`
				+ (parseInt($("#items-center").attr('page'))+1) + ','
				+ `)"></i>
			</div>
		`);
	} else if (items == length && type == 3)  {
		$("#items-center").append(`
			<div id="pages">
				<i class="fas fa-arrow-left" onclick="searchSubCategories2(` 
				+ $("#items-center").attr('subcat2') + ','
				+ $("#items-center").attr('subcat') + ','
				+ $("#items-center").attr('cat') + `,`
				+ (parseInt($("#items-center").attr('page'))-1) + ','
				+ `)"></i>
				<span id="page">Страница ` + (parseInt($("#items-center").attr('page'))+1) + `</span>
				<i class="fas fa-arrow-right" onclick="searchSubCategories2(` 
				+ $("#items-center").attr('subcat2') + ','
				+ $("#items-center").attr('subcat') + ','
				+ $("#items-center").attr('cat') + `,`
				+ (parseInt($("#items-center").attr('page'))+1) + ','
				+ `)"></i>
			</div>
		`);
	} else if (items == length && type == 4)  {
		$("#items-center").append(`
			<div id="pages">
				<i class="fas fa-arrow-left" onclick="searchItems(` 
				+ (parseInt($("#items-center").attr('page'))-1)
				+ `)"></i>
				<span id="page">Страница ` + (parseInt($("#items-center").attr('page'))+1) + `</span>
				<i class="fas fa-arrow-right" onclick="searchItems(` 
				+ (parseInt($("#items-center").attr('page'))+1)
				+ `)"></i>
			</div>
		`);
	}
}

$(function() {
  getLatest();
});