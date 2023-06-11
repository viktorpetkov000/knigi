function viewItem(id) {
	let errorMessage = "";
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
							<span class="item-window-topbar-text item-window-topbar-text-cat">` + categories.main[result.items[0].category] + " / " + categories.sub[result.items[0].category][result.items[0].subcategory] + " / " + categories.sub2[result.items[0].category][result.items[0].subcategory][result.items[0].subcategory2] + `</span>
						</div>
					</div>
					<div class="item-window-row">
						<div class="item-window-images">
							<div class="item-window-image-main-container">
								<div class="item-window-image-main">
									<img src="./assets/save.png" class="item-window-image-main-image"/>
								</div>
							</div>
							<div class="carousel-window">
							</div>
						</div>
						<div class="item-window-info1">
							<div class="item-window-info1-title">
								<span class="item-window-info1-title-text">Мед и Мляко - Иван Вазов - 1905г</span>
							</div>
							<div class="item-window-info1-combine">
								<div class="item-window-info1-description">
									<span class="item-window-info1-description-text-title">Описание:</span>
									<img src="./assets/separator.png"/>
									<span class="item-window-info1-description-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur vestibulum nunc consequat eget morbi nisl. Odio nulla turpis in lacus vel in. Tincidunt sed nulla habitant turpis tempor elementum purus nullam posuere. Leo vitae nam et, massa quam tempor sit nullam posuere. Aenean lacus libero adipiscing laoreet porttitor elit. Velit dictum erat nunc, adipiscing pulvinar cras a. A, habitant et pellentesque id dignissim egestas. Est arcu curabitur neque, quis commodo, sit suspendisse nibh</span>
								</div>
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
										Състояние: <span class="item-window-info1-spec-condition item-window-info1-spec-text2">Ново</span>
									</span>
								</div>
							</div>
						</div>
						<div class="item-window-info2">
							<div class="item-window-info2-price">
								<span class="item-window-info2-price-text">35.90</span>
								<span class="item-window-info2-price-text2">EUR</span>
							</div>
							<div id="paypal-payment-button"></div>
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
				let itemPrice = result.items[0].price;
				let itemId = result.items[0].id;
				let itemUid = result.items[0].uid;
				let validationFlag = false;
				$.ajax({
					type: "POST",
					url: 'scripts/session.php',
					cache: false,
					contentType: false,
					processData: false,
					dataType: 'json',
					data: {},
					success: function(result) {
						if (result.uid > 0) {
							formData = new FormData;
							formData.append('iid', itemId);
							formData.append('sid', itemUid);
							$.ajax({
								type: "POST",
								url: 'scripts/validateBeforePurchase.php',
								cache: false,
								contentType: false,
								processData: false,
								dataType: 'json',
								data: formData,
								success: function(result) {
									console.log(result);
									if (result == 1)
										errorMessage = "Моля влезте в профила си, за да направите поръчка";
									else if (result == 2)
										errorMessage = "Невалидна поръчка.";
									else if (result == 3)
										errorMessage = "Тази продажба е приключила.";
									else if (result == 4)
										validationFlag = true;
									else if (result == 5)
										errorMessage = "Не може да купите собствена продажба.";
									else if (result == 6)
										errorMessage = "Моля добавете адрес и телефонен номер в профилът си.";
									else
										errorMessage = "Възникна проблем.";
									paypal.Buttons({
										style : {
											color: 'blue',
											shape: 'pill',
											height: 35,
										},
										createOrder: function (data, actions) {
											console.log(validationFlag);
											if (!validationFlag) {
												showMessage(errorMessage)
												return;
											}
											return actions.order.create({
												purchase_units : [{
														amount: {
															value: itemPrice
														}
													}]
												});
											},
										onApprove: function (data, actions) {
											return actions.order.capture().then(function (details) {
												$("#item-window-form").html(`
													<div>
														<span>Успешно направена поръчка! Натиснете <a href="#" id="open-orders-href">Тук</a> за да видите поръчките си.</span>
													</div>
												`);
												formData = new FormData;
												formData.append('iid', itemId);
												formData.append('sid', itemUid);
												formData.append('paypal_id', details.id);
												formData.append('paypal_email', details.payer.email_address);
												formData.append('paypal_user_id', details.payer.payer_id);
												formData.append('paypal_date', details.create_time);
												$.ajax({
													type: "POST",
													url: 'scripts/purchase.php',
													cache: false,
													contentType: false,
													processData: false,
													dataType: 'json',
													data: formData,
													success: function(result) {
														if (result == 4) {
															showMessage("Успешна поръчка.");
															getLatest();
														} else showMessage("Възникна проблем. Моля свържете се с нас.");
													},
												});
											})
										},
										onCancel: function (data) {
											showMessage("Неуспешно направена поръчка");
										}
									}).render('#paypal-payment-button');
								},
							});
						}
					},
				});

				let $carouselWindow = $('.carousel-window').flickity({
					initialIndex: 0,
					wrapAround: false,
					cellSelector: '.item-window-image-cell'
				});
				$(".item-window-image-main-image").prop("src", './files/' + result.items[0].image);
				let item = `<div class="item-window-image-cell"><img src="./assets/save.png" class="item-window-image"/></div>`
				for (i = 0; i < result.items.length; i++) {
          item = `<div class="item-window-image-cell" name="` + i + `")"><img src="./files/` + result.items[i].name + `"/></div>`;
					$carouselWindow.flickity('append', $(item));
				}
				let condit = "";
        switch (result.items[0].condit) {
          case "1": 
          condit = "Ново"
          break;
          case "2": 
          condit = "Отлично"
          break;
          case "3": 
          condit = "Много добро"
          break;
          case "4": 
          condit = "Добро"
          break;
          case "5": 
          condit = "Лошо"
          break;
        }
				$(".item-window-info1-title-text").html(result.items[0].title);
				$(".item-window-info1-description-text").html(result.items[0].descr);
				$(".item-window-info1-spec-condition").html(condit);
				$(".item-window-info2-price-text").html(result.items[0].price);
				$(".item-window-info1-spec-author").html(result.items[0].author);
				$(".item-window-info1-spec-publisher").html(result.items[0].publisher);
				$(".item-window-info1-spec-year").html(result.items[0].year);
				$(".item-window-info1-spec-size").html(result.items[0].size);
				$("#item-window").modal('show');
				$( "#item-window .next" ).click(function() {
					$( ".item-window-image-cell" ).each(function() {
						if ($(this).hasClass( "is-selected" )) {
							$(".item-window-image-main-image").prop("src", $(this).children().prop("src"));
						};
					});
				});
				$( "#item-window .previous" ).click(function() {
					$( ".item-window-image-cell" ).each(function() {
						if ($(this).hasClass( "is-selected" )) {
							$(".item-window-image-main-image").prop("src", $(this).children().prop("src"));
						};
					});
				});
				$( ".item-window-image-cell" ).click(function() {
					$(".item-window-image-main-image").prop("src", $(this).children().prop("src"));
					$carouselWindow.flickity('select', $(this).attr('name'));
				});
				$( ".item-window-return" ).click(function() {
					$('#item-window').modal('toggle');
				});
				let timer = setTimeout(resize, 200);
				function resize() {
					$('.carousel-window').flickity('resize')
					clearTimeout(timer);
				}
      } else showMessage("Няма такава продажба.");
    },
	});
}

function notifyBuyerPurchase(sid) {
	let formData = new FormData();
	formData.append('receivedby', sid);
	formData.append('message', "Закупих вашата продажба - " + $("#item-page-title").html());
	$.ajax({
		type: "POST",
		url: 'scripts/sendMessage.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result)
				window.location.href = 'messages.php?cid='+sid;
		},
	});
}

function contactSeller(sid) {
	let formData = new FormData();
	formData.append('receivedby', sid);
	formData.append('message', "Закупих вашата продажба - " + $("#item-page-title").html());
	$.ajax({
		type: "POST",
		url: 'scripts/sendMessage.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result)
				window.location.href = 'messages.php?cid='+sid;
		},
	});
}