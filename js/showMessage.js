function showMessage(message) {
	$("#snackbar").html(message);
	$("#snackbar").addClass("show");
	setTimeout(function(){ $("#snackbar").removeClass("show") }, 3000);
}