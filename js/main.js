function viewItem(id, title, image, description, price) {
	$("#windowTitle").html(title);
	$("#windowForm").html(
		`<div class="d-flex flex-column text-center">
			<img src="files/` + image + `" class="item-large-image">
			<div class="item-large-price">` + price + `лв</div>
			<div class="item-large-descr">` + description + `</div>
			<button type="submit" class="btn btn-info btn-block btn-round" onClick="gotoItem(` + id + `)">Към продажбата</button>
		</div>`)
	$("#window").modal('show');
}

function gotoItem(id) {
	window.location.href = 'item.php?id=' + id;
}