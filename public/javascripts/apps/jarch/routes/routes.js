/*this is the primary router for the create a post app*/
define([
	"/javascripts/libs/underscore/underscore-1.3.1.js",
	"/javascripts/libs/backbone/backbone-0.9.1.js",
	"views/index"
], function( _, Backbone, Index ){
	
	var Router = Backbone.Router.extend({

		routes: {
			'': 'index'
		},

		initialize: function( ) {
			_.bindAll( this );
		},
		
		setConfig: function( options ){
			console.log( "setting the config options" );
			this.config = options;
		},

		index: function( options ){
			console.log( "here in index" );
			var index = new Index();
		}
	});
	
	var initialize = function( options ){
		var appRouter = new Router();
		appRouter.setConfig( options );
		Backbone.history.start();
	};
	
	return {
		initialize: initialize
	};
	
});


