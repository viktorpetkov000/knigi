// function viewItem(id, title, image, description, price) {
// 	$("#windowTitle").html(title);
// 	$("#windowForm").html(
// 		`<div class="d-flex flex-column text-center">
// 			<img src="files/` + image + `" class="item-large-image">
// 			<div class="item-large-price">` + price + `лв</div>
// 			<div class="item-large-descr">` + description + `</div>
// 			<button type="submit" class="btn btn-info btn-block btn-round" onClick="gotoItem(` + id + `)">Към продажбата</button>
// 		</div>`)
// 	$("#window").modal('show');
// }

function viewItem(id) {
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
							<span class="item-window-topbar-text item-window-topbar-text-cat">Категория</span>
						</div>
					</div>
					<div class="item-window-images">
					
					</div>
				</div>
				`);
				// $("#windowForm").html(
				// 	`<div class="d-flex flex-column text-center">
				// 		<img src="files/` + result.items[0].image + `" class="item-large-image">
				// 		<div class="item-large-price">` + result.items[0].price + `лв</div>
				// 		<div class="item-large-descr">` + result.items[0].descr + `</div>
				// 	</div>`)
				$("#item-window").modal('show');
      } else showMessage("Няма такава продажба.");
    },
	});
}