;(function(context, $) {

	// thanks @fnando, original project https://github.com/fnando/module
  	'use strict';

  	// Build a new module with the correct attributes and methods.
	function build() {
		var Constructor, Instance;

		Constructor = function() {
			// Initialize a new instance, which won't do nothing but
			// inheriting the prototype.
			var instance = new Instance();

			// Apply the initializer on the given instance.
			instance.initialize.apply(instance, arguments);

			return instance;
		};

		// Define the function that will be used to
		// initialize the instance.
		Instance = function() {};
		Instance.prototype = Constructor.prototype;

		// Save some typing and make an alias to the prototype.
		Constructor.fn = Constructor.prototype;

		// Define a noop initializer.
		Constructor.fn.initialize = function() {};

		return Constructor;
	}

	//define plugin js is exist
	$.fn.isExist = function(selector, callback) {
		var element = this.find( selector );

		if ( element.length && typeof callback == 'function' ) {
			callback.call( null, element, this );
		}

		return element.length;
	};

	// Define utils default
	var utils = {
		toTitleCase : function(text) {
		    text = text.replace(/(?:^|-)\w/g, function(match) {
		        return match.toUpperCase();
		    });

		    return text.replace(/-/g, '');
		},

		toCamelCase : function(text) {
		    text = text.replace(/(?:^|-)\w/g, function(match, index) {
		        return ( !index ) ? match : match.toUpperCase();
		    });

		    return text.replace(/-/g, '');
		},

		addQueryVars : function(params, url) {
			var listParams = [];

			for ( var item in params ) {
				listParams.push( item + '=' + params[ item ] );
			}

			return url + ( url.match(/\/\?/) ? '&' : '?' ) + listParams.join( '&' );
		},

		getUrlAjax : function() {
			return ( window.AdminGlobalVars || {} ).urlAjax;
		}
	};

	var Module = function(namespace, callback, object, isGlobalScope) {
		var components = namespace.split(/[.:]+/)
		  , scope      = context
		  , component
		  , last
		;

		if ( ! isGlobalScope ) {
			scope = scope[Module.setup.namespace] = ( scope[Module.setup.namespace] || {} );
		}

		if ( typeof callback !== 'function' ) {
			object   = callback;
			callback = null;
		}

		object = object || build();

	    // Process all components but the last, which will store the
	    // specified object attribute.
    	for ( var i = 0, count = components.length; i < count; i++ ) {
      		last = ( i == count - 1 );
      		scope[components[i]] = ( last ? object : ( scope[components[i]] || {} ) );
      		scope = scope[components[i]];
    	}

    	if (callback) {
      		callback.call( scope, scope, utils, $, scope.prototype );
    	}

    	return scope;
  	};

  	//change namespace
  	Module.setup = {
		namespace : 'Resuta'
  	};

  	context[Module.setup.namespace] = {
  		Components : {},
  		Ajax       : {}
  	};

	Module.Wrapper = function(namespace, initializer) {
		return Module(namespace, function(Definition) {
			Definition.fn.initialize = function(namespace, callback) {
				initializer.apply(Definition, arguments);
			};

			return Definition;
		}, null, true );
	};

	// Expose the module function.
	context.Module = Module;

	Module( 'FactoryComponents', function(FactoryComponents, utils) {
		var components = context[Module.setup.namespace].Components;

		FactoryComponents.create = function(container) {
			container.isExist( '[data-component]', this.constructor.bind( this ) );
		};

		FactoryComponents.constructor = function(elements) {
			elements.each( this.each.bind( this ) );
		};

		FactoryComponents.each = function(index, element) {
			var $el  = $( element )
			  , name = utils.toTitleCase( $el.data( 'component' ) )
			;

			if ( typeof components[name] != 'function' ) {
				return;
			}			

			components[name].call( null, $el );
		};
	}, {} );

	Module.Wrapper( 'Module.ComponentWrapper', function(namespace, callback) {

		Module( ['Components', namespace].join( '.' ), function(Model, utils, $) {
			Model.fn.initialize = function(container) {
				this.$el  = container;
				this.on   = null;
				this.fire = null;
				
				//start component
				this.assign();
				this.init();
			};

			Model.fn.assign = function() {
	      		// this.setAttrs();
	      		this.setElements();
	      		this.emitter();
	    	};

	    	Model.fn.setElements = function() {
	    		var self = this
	    		  , name
	    		  , target
	    		;

	    		this.elements = ( this.elements || {} );

	    		this.$el.find( '[data-element]' ).each(function(index, element) {
					target = $( element );
					name   = utils.toCamelCase( target.data( 'element' ) );

					//set attr in object elements
					self.elements[name] = target;
	    		});
	    	};

	    	Model.fn.setAttrs = function() {
	    		var attrs = this.$el.data();

	      		for ( var name in attrs ) {
	        		this[name] = attrs[name];
	      		}
	    	};

	    	Model.fn.emitter = function() {
				this.on   = $.proxy( this.$el, 'on' );
				this.fire = $.proxy( this.$el, 'trigger' );
	    	};

	    	Model.fn.addEvent = function(event, action) {
	    		var handle = utils.toCamelCase( [ '_on', event, action ].join( '-' ) );

	    		this.on(
	    			  event
	    			, '[data-action=' + action + ']'
	    			, ( this[handle] || $.noop ).bind( this )
	    		);
	    	};

	    	Model.fn.init = function() {

	    	};

			callback( Model, utils, $ );
		});

	});

})( window, Zepto );