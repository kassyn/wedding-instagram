Module( 'Ajax.Instagram', function(Instagram) {

	var ACCESS_TOKEN = '1428594783.7e0398e.0401379857454f848f68e1fb1ae8967e'
	  , COUNT        = 30
	;

	Instagram.fn.initiaize = function() {
		this.next = null;
	};

	Instagram.fn.getFeeds = function() {
		return new RSVP.Promise( $.proxy( this, 'request', {} ) );
	};

	Instagram.fn.getNextFeeds = function() {
		var data = {
			max_tag_id : this.next
		};

		return new RSVP.Promise( $.proxy( this, 'request', data ) );
	};

	Instagram.fn.request = function(data, resolve, reject) {
		var params = $.extend({
			access_token : ACCESS_TOKEN,
			count        : COUNT
		}, data || {} );
		
		$.ajax({
			url      : 'https://api.instagram.com/v1/tags/nataliaeaccacio/media/recent',
			dataType : 'jsonp',
			success  : $.proxy( this, '_onSuccess', resolve ),
			error    : $.proxy( this, '_onError', reject ),
			data     : params
 		});
	};

	Instagram.fn._onSuccess = function(resolve, response) {
		this.next = ( response.pagination || {} ).next_max_tag_id;

		resolve( response.data || [] );
	};

	Instagram.fn._onError = function(reject, xhr, errorType, error) {
		reject( errorType, error );
	};

});