Module( 'HandlebarsHelpers', function(HandlebarsHelpers) {

	HandlebarsHelpers.create = function() {
		Handlebars.registerHelper( 'json', function(object) {
	  		return JSON.stringify( object );
		});
	};

}, {} );
