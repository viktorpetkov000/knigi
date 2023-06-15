let purchaseNotifications = 0;
let purchaseSentNotifications = 0;

function viewItem(id, mode) {
	let ended = 0;
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
								<span class="item-window-info1-title-text"></span>
							</div>
							<div class="item-window-info1-combine">
								<div class="item-window-info1-description">
									<span class="item-window-info1-description-text-title">Описание:</span>
									<img src="./assets/separator.png"/>
									<span class="item-window-info1-description-text"></span>
								</div>
								<div class="item-window-info1-specs">
									<span class="item-window-info1-description-text-title">Характеристики:</span>
									<img src="./assets/separator.png"/>
									<span class="item-window-info1-spec-text">
										Автор: <span class="item-window-info1-spec-author item-window-info1-spec-text2"></span>
										<br>
										Издател: <span class="item-window-info1-spec-publisher item-window-info1-spec-text2"></span>
										<br>
										Година: <span class="item-window-info1-spec-year item-window-info1-spec-text2"></span>
										<br>
										Обем: <span class="item-window-info1-spec-size item-window-info1-spec-text2"></span>
										<br>
										Състояние: <span class="item-window-info1-spec-condition item-window-info1-spec-text2"></span>
									</span>
								</div>
							</div>
							<div id="item-window-info-3">
								<div class="item-window-info3-delivery">
									<span class="item-window-info3-delivery-title">Информация за купувач</span>
								</div>
								<div class="item-window-info3-delivery-info">
									<span class="item-window-info1-spec-text">
										Aдрес: <span class="item-window-info3-address item-window-info1-spec-text2"></span>
										<br>
										Телефон: <span class="item-window-info3-phone item-window-info1-spec-text2"></span>
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
							<div id="item-window-options">
							</div>
							<div class="item-window-info2-profile">
								<span class="item-window-info2-profile-text">Потребител: </span>
								<span class="item-window-info2-profile-text-name"></span>
								<img src="./assets/users.png" class="item-window-info2-profile-image"/>
							</div>
							<div id="item-window-rating">
								<span class="leave-rating item-window-info1-spec-text2">Остави оценка</span>
								<div class="rating-options">
									<img src="./assets/thumbsup.png" class="items-rating-thumbsup"/>
									<img src="./assets/thumbsdown.png" class="items-rating-thumbsdown"/>
								</div>
							</div>
						</div>
					</div>
				</div>
				`);
				let itemPrice = result.items[0].price;
				let itemId = result.items[0].id;
				let itemUid = result.items[0].uid;
				let validationFlag = false;
				let ended = result.items[0].ended;
				let sent = result.items[0].sent;
				let received = result.items[0].received;
				let rating = result.items[0].rating;
				let username = result.sellerName;
				let sellerUid = result.sellerUid;
				let buyerUid = result.items[0].buyerid;
				let address = result.address;
				let phone = result.phone;
				$(".item-window-info2-profile-text-name").html(username);
				$(document).off('click','.item-window-info2-profile');
				$(document).on('click','.item-window-info2-profile', function(){
					window.location.href = './account.php?uid='+sellerUid;
				});
				if (ended == 1) {
					$(".item-window-save").css('display','none');
					$(".item-window-info2-contact").css('display','none');
					if (result.ownItem) {
						$("#item-window-info-3").css('display','block');
						$(".item-window-info2-contact-text").html("Свържи се с купувача");
						$(".item-window-info2-contact").css('display','flex');
						$(".item-window-info3-address").html(address);
						$(".item-window-info3-phone").html(phone);
						$(document).off('click','.item-window-info2-contact');
						$(document).on('click','.item-window-info2-contact', function(){
							contactSeller(buyerUid);
						});
						if (sent == 1 && received == 1) {
							$("#item-window-options").html(`
								<button type="button" class="btn btn-info btn-block btn-round button-red" disabled>Поръчката е получена</button>
							`)
							$("#item-window-rating").css('display','block');
							
							if (rating == 1) {
								$(".leave-rating").html("Оценка")
								$(".items-rating-thumbsup").css('display','block');
								$(".items-rating-thumbsdown").css('display','none');
							} else if (rating == 2) {
								$(".leave-rating").html("Оценка")
								$(".items-rating-thumbsdown").css('display','block');
								$(".items-rating-thumbsup").css('display','none');
							} else {
								$(".leave-rating").html("Няма оценка")
							}
						} else {
							if (sent == 1) {
								$("#item-window-options").html(`
									<button type="button" class="btn btn-info btn-block btn-round button-red" disabled>Поръчката е изпратена</button>
								`)
							} else {
								$("#item-window-options").html(`
									<button type="button" id="mark-order-sent" class="btn btn-info btn-block btn-round button-red">Маркирай поръчката като изпратена</button>
								`)
								$(document).off('click','#mark-order-sent');
								$(document).on('click','#mark-order-sent', function(){
									sendPurchase(itemId);
								});
							}
						}
					} else if (result.boughtItem) {
						$("#item-window-info-3").css('display','block');
						$(".item-window-info2-contact-text").html("Свържи се с продавача");
						$(".item-window-info2-contact").css('display','flex');
						$(".item-window-info3-address").html(address);
						$(".item-window-info3-phone").html(phone);
						$(document).off('click','.item-window-info2-contact');
						$(document).on('click','.item-window-info2-contact', function(){
							contactSeller(sellerUid);
						});
						if (sent == 1 && received == 1) {			
							$("#item-window-options").html(`
								<button type="button" class="btn btn-info btn-block btn-round button-red" disabled>Поръчката е получена</button>
							`)
							$("#item-window-rating").css('display','block');
							$(".items-rating-thumbsup").css('display','block');
							$(".items-rating-thumbsdown").css('display','block');
							if (rating == 1) {

							} else if (rating == 2) {

							}
							$(document).off('click','.items-rating-thumbsdown');
							$(document).on('click','.items-rating-thumbsdown', function(){
								createRating(itemId, 2);
							});
							$(document).off('click','.items-rating-thumbsup');
							$(document).on('click','.items-rating-thumbsup', function(){
								createRating(itemId, 1);
							});
						} else if (sent == 1) {
							$("#item-window-options").html(`
								<button type="button" id="mark-order-received" class="btn btn-info btn-block btn-round button-red">Маркирай поръчката като получена</button>
							`)
							$(document).off('click','#mark-order-received');
							$(document).on('click','#mark-order-received', function(){
								receivePurchase(itemId);
							});
						} else {
							$("#item-window-options").html(`
								<button type="button" class="btn btn-info btn-block btn-round button-red disabled">Поръчката се очаква да бъде изпратена</button>
							`)
						}
					}
				}
				$.ajax({
					type: "POST",
					url: 'scripts/session.php',
					cache: false,
					contentType: false,
					processData: false,
					dataType: 'json',
					data: {},
					success: function(result) {
						if (result.uid > 0 && ended == 0) {
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
									if (result == 1)
										errorMessage = "Моля влезте в профила си, за да направите поръчка";
									else if (result == 2)
										errorMessage = "Невалидна поръчка.";
									else if (result == 3)
										errorMessage = "Тази продажба е приключила.";
									else if (result == 4) {
										validationFlag = true;
									}
									else if (result == 5)
										errorMessage = "Не може да купите собствена продажба.";
									else if (result == 6)
										errorMessage = "Моля добавете адрес и телефонен номер в профилът си.";
									else
										errorMessage = "Възникна проблем.";
									if (result == 4 || result == 6) {
										paypal.Buttons({
											style : {
												color: 'blue',
												shape: 'pill',
												height: 35,
											},
											createOrder: function (data, actions) {
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
										$(".item-window-info2-contact").css('display','flex');
										$(document).off('click','.item-window-info2-contact');
										$(document).on('click','.item-window-info2-contact', function(){
											contactSeller(itemUid);
										});
									}
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

function createRating(id, rate) {
	let formData = new FormData();
	formData.append('id', id);
	formData.append('rate', rate);
	$.ajax({
		type: "POST",
		url: 'scripts/createRating.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result) {
				if (result == 4)
					showMessage("Успешно зададен рейтинг.");
				else if (result == 3)
					showMessage("Неуспешно задаване на рейтинг.");
				else if (result == 2)
					showMessage("Рейтингът може да е само между + и -");
				else if (result == 1)
					showMessage("Тази поръчка не е ваша.");
				else
					showMessage("Неуспешно задаване на рейтинг.");
			}
		},
	});
}

function checkPurchaseNotification() {
	$.ajax({
		type: "POST",
		url: 'scripts/checkPurchaseNotifications.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: [],
		success: function(result) {
			$(".purchase-notification-bubble-item").css("display","none");
			$("#purchase-notification-bubble").css("display","none");
			$("#purchase-notification-bubble-drop").css("display","none");
			if (result) {
				purchaseNotifications = result.data.length;
				$("#purchase-notification-number").html(purchaseNotifications);
				$("#purchase-notification-number-drop").html(purchaseNotifications);
				if (purchaseNotifications > 0) {
					$("#purchase-notification-bubble").css("display","block");
					$("#purchase-notification-bubble-drop").css("display","block");
					for (i = 0; i < purchaseNotifications; i++)
						$('#purchase-notification-bubble-item-'+result.data[i].id).css('display','block');
				}
			}
		}
	});
}

function checkPurchaseSentNotification() {
	$.ajax({
		type: "POST",
		url: 'scripts/checkPurchaseSentNotifications.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: [],
		success: function(result) {
			$(".purchase-sent-notification-bubble-item").css("display","none");
			$("#purchase-sent-notification-bubble").css("display","none");
			$("#purchase-sent-notification-bubble-drop").css("display","none");
			if (result) {
				purchaseSentNotifications = result.data.length;
				$("#purchase-sent-notification-number").html(purchaseSentNotifications);
				$("#purchase-sent-notification-number-drop").html(purchaseSentNotifications);
				if (purchaseSentNotifications > 0) {
					$("#purchase-sent-notification-bubble").css("display","block");
					$("#purchase-sent-notification-bubble-drop").css("display","block");
					for (i = 0; i < purchaseSentNotifications; i++)
						$('#purchase-sent-notification-bubble-item-'+result.data[i].id).css('display','block');
				}
			}
		}
	});
}

function clearSentPurchasesNotifications(id) {
	formData = new FormData;
	formData.append('iid', id);
	$.ajax({
		type: "POST",
		url: 'scripts/clearSentPurchasesNotifications.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result)
				checkPurchaseSentNotification();
		}
	});
}

function clearReceivedPurchasesNotifications(id) {
	formData = new FormData;
	formData.append('iid', id);
	$.ajax({
		type: "POST",
		url: 'scripts/clearReceivedPurchasesNotifications.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result)
				checkPurchaseNotification();
		}
	});
}

function clearRatingNotifications(id) {
	formData = new FormData;
	formData.append('iid', id);
	$.ajax({
		type: "POST",
		url: 'scripts/clearRatingNotifications.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result)
				checkPurchaseNotification();
		}
	});
}

function sendPurchase(iid) {
	let formData = new FormData();
	formData.append('iid', iid);
	$.ajax({
		type: "POST",
		url: 'scripts/sendPurchase.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result) {
				showMessage("Успешно маркиране на поръчката като изпратена");
				$("#item-window-options").html(`
					<button type="button" class="btn btn-info btn-block btn-round button-red" disabled>Поръчката е изпратена</button>
				`)
				checkPurchaseNotification();
			} else
				showMessage("Имаше грешка при маркирането на поръчката. Моля свържете се с нас");
		},
	});
}

function receivePurchase(iid) {
	let formData = new FormData();
	formData.append('iid', iid);
	$.ajax({
		type: "POST",
		url: 'scripts/receivePurchase.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result) {
				showMessage("Успешно маркиране на поръчката като получена");
				$("#item-window-options").html(`
					<button type="button" class="btn btn-info btn-block btn-round button-red" disabled>Поръчката е получена</button>
				`)
			} else
				showMessage("Имаше грешка при маркирането на поръчката. Моля свържете се с нас");
		},
	});
}

function contactSeller(sid) {
	let formData = new FormData();
	formData.append('contactUser', sid);
	$.ajax({
		type: "POST",
		url: 'scripts/contactUser.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result)
				window.location.href = './messages.php?contact=true';
			else
				showMessage("Възникна грешка.");
		}
	});
}

$(function() {
	setInterval(checkPurchaseNotification, 60000);
	setInterval(checkPurchaseSentNotification, 60000);
	checkPurchaseNotification();
	checkPurchaseSentNotification();
});