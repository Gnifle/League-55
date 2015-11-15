var APIkey = '84e3b234-db15-415b-8760-8e74c8f38500';

$(document).ready(function() {

	setRegionSelect(getCookie('region'));

});

function hideNotification() {
	$('.notice-container').removeClass('notice');
	$('.notice-container').removeClass('error');
	$('.notice-container').removeClass('warning');
	$('.notice-container').removeClass('success');
}

function loading() {
	$('.loader').show();
}

function changeTap(){
	var tabHeaders = $('[name="tab-header"]');
	$.each(tabHeaders, function() {
		var currentTab = this.id.split('-')[1];
		if(this.checked) {
			$('.label-tab-' + currentTab).addClass('active');
			$('#tab-content-' + currentTab).addClass('active');
		} else {
			$('.label-tab-' + currentTab).removeClass('active');
			$('#tab-content-' + currentTab).removeClass('active');
		}
	});
}