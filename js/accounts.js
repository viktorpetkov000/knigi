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
        //console.log(result);
        //$("#account-page-items-active").html(`Активни продажби: <a href='#' onclick="getUserItems(0,` + getUrlParameter('uid') + `)">` + result.data[1]["COUNT(id)"] + `</a>`);
        $("#account-page-items-ended").html(`Приключени продажби: <a href='#' onclick="getUserItems(1,` + getUrlParameter('uid') + `)">` + result.data[2]["COUNT(id)"] + `</a>`)
        let rate = ""
        let count = 0;
        let good = 0;
        let bad = 0;
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

function loadActiveItems() {
  getUserItems(0, 15)
}

$(function() {
  loadAccountPage();
});