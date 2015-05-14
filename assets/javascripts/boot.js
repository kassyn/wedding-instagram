$(function() {
	var context = $( 'body' );

	Resuta.vars = {
		body : context
	};

	//set route in application
	Dispatcher( Resuta.Application, window.pagenow, [context] );
});
