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

function loadAccountPage() {
  let formData = new FormData();
  formData.append('uid', getUrlParameter('uid'));
	$.ajax({
		type: "POST",
		url: 'scripts/getUserData.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result) {
        $("#account-page-title").html('<i class="far fa-user" id="user-title"></i>' + result.data[0].username)
        $("#account-page-items-active").html(`Активни продажби: <a href='#' onclick="getUserItems(0,` + getUrlParameter('uid') + `)">` + result.data[1]["COUNT(id)"] + `</a>`);
        $("#account-page-items-ended").html(`Приключени продажби: <a href='#' onclick="getUserItems(1,` + getUrlParameter('uid') + `)">` + result.data[2]["COUNT(id)"] + `</a>`)
        let rate = ""
        let count = 0;
        let good = 0;
        let bad = 0;
        if (result.data[4]) {
          $("#account-page-details-container-sales").css('display','block')
          $("#account-page-details-container").css('display','block')
          $(".account-contact").css('display','none')
          if (result.data[0].address)
            $("#account-page-details-address").html(result.data[0].address)
          if (result.data[0].phone)
            $("#account-page-details-phonenumber").html(result.data[0].phone)
          if (result.data[0].iban)
            $("#account-page-details-iban").html(result.data[0].iban)
        } else {
          $("#account-page-details-container").css('display','none')
          $(".account-contact").css('display','inline-flex')
          $(document).off('click','.account-contact');
          $(document).on('click','.account-contact', function(){
            contactSeller(result.data[0].uid);
          });
          $("#account-page-details-container-sales").css('display','none')
        }
        if (result.data[3]) {
          for (i = 0; i < result.data[3].length; i++) {
            count++;
            if (result.data[3][i].rating == "2") {
              rate = "+";
              good++;
            }
            else if (result.data[3][i].rating == "1") {
              rate = "-";
              bad++;
            }
            else break;
            $("#account-page-rates").append("<p class='account-page-rating'>Оценка: " + rate + " | Потребител: <a href='./account.php?uid=" + result.data[3][i].buyerid + "'>"
             + result.data[3][i].username + "</p>");
          }
          $("#account-page-rates-title").append(" + (" + good + " | " + bad + ") -");
          $("#account-page-rates").append(`
          <div id="pages-rating">
            <i class="fas fa-arrow-left" onclick="getRatingData(` + -1 + `)"></i>
            <span id="page">Страница ` + 1 + `</span>
            <i class="fas fa-arrow-right" onclick="getRatingData(` + 1 + `)"></i>
          </div>`); 
        } else $("#account-page-rates").append("<p class='account-page-rating'>Този потребител няма оценки</p>");
			} else showMessage("Няма такъв потребител.");
    },
	});
}

function getRatingData(page) {
  let formData = new FormData();
	if (page)
		formData.append('page', page);
	else
		page = 0;
  formData.append('uid', getUrlParameter('uid'));
	$.ajax({
		type: "POST",
		url: 'scripts/getRatings.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result) {
        let rate = ""
        let count = 0;
        let good = 0;
        let bad = 0;
        if (result.data[3]) {
          $("#account-page-rates").html("");
          for (i = 0; i < result.data[3].length; i++) {
            count++;
            if (result.data[3][i].rating == "2") {
              rate = "+";
              good++;
            }
            else if (result.data[3][i].rating == "1") {
              rate = "-";
              bad++;
            }
            else break;
            $("#account-page-rates").append("<p class='account-page-rating'>Оценка: " + rate + " | Потребител: <a href='./account.php?uid=" + result.data[3][i].buyerid + "'>"
             + result.data[3][i].username + "</p>");
          }
          $("#account-page-rates-title").append(" + (" + good + " | " + bad + ") -");
          $("#account-page-rates").append(`
          <div id="pages-rating">
            <i class="fas fa-arrow-left" onclick="loadAccountPage(` + (parseInt(page)-1) + `)"></i>
            <span id="page">Страница ` + (parseInt(page)+1) + `</span>
            <i class="fas fa-arrow-right" onclick="loadAccountPage(` + (parseInt(page)+1) + `)"></i>
          </div>`); 
        } else showMessage("Няма други оценки.");
			} else showMessage("Няма такъв потребител.");
    },
	});
}

function changeDetails() {
  let address = $("#account-page-details-address").html();
  let phone = $("#account-page-details-phonenumber").html();
  let changeDetailsHTML = `
    <h4 id="account-page-details-title">Промяна на детайли: </h5>
    <div id="account-page-details">
      <h5>Адрес на доставка:</h5>
      <input id="account-page-details-address" class="form-control input-1" value="`+address+`" placeholder="Адрес на доставка..."></input>
      <h5 id="account-page-details-phone">Телефонен номер:</h5>
      <input id="account-page-details-phonenumber" class="form-control input-1" value="`+phone+`"  placeholder="Телефонен номер..."></input><br>
      <input type="button" id="account-page-details-change-confirm" class="btn btn-info btn-block btn-round button-red" value="Запази промените"></input>
    </div>`
  $("#account-page-details-container").html(changeDetailsHTML);
  $(document).off('click','#account-page-details-change-confirm');
  $(document).on('click','#account-page-details-change-confirm', function(){
		saveDetails();
	});
}

function saveDetails() {
  showMessage("Успешно запазване на промени.")
  let address = $("#account-page-details-address").val();
  let phone = $("#account-page-details-phonenumber").val();
  let saveDetailsHTML = `
    <h4 id="account-page-details-title">Детайли за покупки: </h5>
    <div id="account-page-details">
      <h5>Адрес на доставка:</h5>
      <span id="account-page-details-address">`+address+`</span>
      <h5 id="account-page-details-phone">Телефонен номер:</h5>
      <span id="account-page-details-phonenumber">`+phone+`</span><br>
      <input type="button" id="account-page-details-change" class="btn btn-info btn-block btn-round button-red" value="Промени детайли"></input>
    </div>`
  let formData = new FormData();
  formData.append('address',address);
  formData.append('phone',phone);
  $.ajax({
		type: "POST",
		url: 'scripts/changeAccountDetails.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
      if (result == 1)
        showMessage("Моля влезте в профила си.");
      else if (result == 3)
        $("#account-page-details-container").html(saveDetailsHTML);
		},
	});
}

function changeDetailsSales() {
  let iban = $("#account-page-details-iban").html();
  let changeDetailsHTML = `
    <h4 id="account-page-details-title">Промяна на детайли: </h5>
    <div id="account-page-details">
      <h5>IBAN:</h5>
      <input id="account-page-details-iban" class="form-control input-1" value="`+iban+`" placeholder="IBAN..."></input>
      <input type="button" id="account-page-details-sales-change-confirm" class="btn btn-info btn-block btn-round button-red" value="Запази промените"></input>
    </div>`
  $("#account-page-details-container-sales").html(changeDetailsHTML);
  $(document).off('click','#account-page-details-change-confirm');
  $(document).on('click','#account-page-details-sales-change-confirm', function(){
		saveDetailsSales();
	});
}

function saveDetailsSales() {
  showMessage("Успешно запазване на промени.")
  let iban = $("#account-page-details-iban").val();
  let saveDetailsHTML = `
    <h4 id="account-page-details-title">Детайли за продажби: </h5>
    <div id="account-page-details">
      <h5>IBAN:</h5>
      <span id="account-page-details-iban">`+iban+`</span>
      <input type="button" id="account-page-details-sales-change" class="btn btn-info btn-block btn-round button-red" value="Промени детайли"></input>
    </div>`
  let formData = new FormData();
  formData.append('iban',iban);
  $.ajax({
		type: "POST",
		url: 'scripts/changeAccountDetailsSales.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
      if (result == 1)
        showMessage("Моля влезте в профила си.");
      else if (result == 3)
        $("#account-page-details-container-sales").html(saveDetailsHTML);
		},
	});
}


function loadActiveItems() {
  getUserItems(0, 15)
}

$(function() {
  loadAccountPage();

  $(document).on('click','#account-page-details-change', function(){
		changeDetails();
	});

  $(document).on('click','#account-page-details-sales-change', function(){
		changeDetailsSales();
	});
});