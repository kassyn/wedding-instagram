Module.ComponentWrapper( 'Feeds', function(Feeds, utils) {

	var TIMER = 8000;

	Feeds.fn.init = function() {
		this.ajax    = Resuta.Ajax.Instagram();
		this.list    = [];
		this.current = 0;
		this.timeout = null;
		this.load();	
	};

	Feeds.fn.load = function() {
		this.getStartInitialPage();
	};

	Feeds.fn.getStartInitialPage = function() {
		this.ajax.getFeeds()
			.then( this._thenPromiseAll.bind( this ) )
		    .catch( this._catchPromiseAll.bind( this ) )
		;
	};

	Feeds.fn._thenPromiseAll = function(response) {
		this.list    = response;
		this.current = 0;		
		
		this.setFlowTimer();
	};

	Feeds.fn.setTimer = function() {
		var execute = 'setFlowTimer';

		if ( this.isFinally() ) {
			execute = 'getNextPage';
		}

		this.timeout = setTimeout( $.proxy( this, execute ), TIMER );
	};

	Feeds.fn.setFlowTimer = function() {
		this.render();
		this.current += 1;
		
		this.setTimer();
	};

	Feeds.fn.isFinally = function() {
		return ( this.current >= this.list.length );
	};

	Feeds.fn.render = function() {
		var item  = this.list[this.current]
		  , first = this.$el.find( '.photo:first-child' )
		  , self  = this
		;

		if ( !first.length ) {
			this.$el.append( Handlebars.templates['photo-feeds']( item ) );
			return;
		}
		
		first.addClass( 'out' );

		setTimeout(function() {
			first.remove();
			self.$el.append( Handlebars.templates['photo-feeds']( item ) );
		}, 500 );
	};

	Feeds.fn.getNextPage = function() {
		this.ajax.getNextFeeds()
			.then( this._thenPromiseAll.bind( this ) )
		    .catch( this._catchPromiseNextPage.bind( this ) )
		;

		clearTimeout( this.timeout );
	};

	Feeds.fn._catchPromiseAll = function(errorType, error) {
		console.log( errorType, error );
	};

	Feeds.fn._catchPromiseNextPage = function() {
		//reset current list
		this.current = 0;
		this.setFlowTimer();
	};

});
