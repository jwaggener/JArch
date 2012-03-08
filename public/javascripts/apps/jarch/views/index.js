define([
	"/javascripts/libs/underscore/underscore-1.3.1.js",
	"/javascripts/libs/backbone/backbone-0.9.1.js",
	"libs/state-machine",
	"text!resources/styles.css",
	"text!resources/templates/index.html",
	"text!resources/templates/yellow.html",
	"text!resources/templates/red.html",
	"text!resources/templates/blue.html"
	], function( _, Backbone, StateMachine, Styles, TemplateIndex, TemplateYellow, TemplateRed, TemplateBlue ){
		
		var Index = Backbone.View.extend({
			
			events:{
				"click #red" : "handleRed",
				"click #yellow" : "handleYellow",
				"click #blue" : "handleBlue"
			},
			
			initialize: function(){
				
				_.bindAll( this );
				
				this.yellow, this.red, this.blue;
				
				this.yellow = this.renderYellow();
				this.red = this.renderRed();
				this.blue = this.renderBlue();
				
				this.statemachine = StateMachine.create({
					events: [
						{ name: 'redEvent', from: [ 'none', 'yellow', 'blue' ],   to: 'red' },
						{ name: 'yellowEvent', from: ['none', 'red', 'blue' ],   to: 'yellow' },
						{ name: 'blueEvent', from: [ 'none', 'red', 'yellow' ],   to: 'blue' },
					],

					callbacks: {
						onred: this.onRed,
						onyellow: this.onYellow,
						onblue: this.onBlue,
					  }

				});
				
				this.currentColor = null;//referes to the html; used with detach
				this.render();
			},
			
			onRed: function(){
				$(this.currentColor).detach();
				this.currentColor = this.red;
				$(this.el).find("#colors").prepend( this.currentColor );
			},
			
			onYellow: function(){
				$(this.currentColor).detach();
				this.currentColor = this.yellow;
				$(this.el).find("#colors").prepend( this.currentColor );
			},
			
			onBlue: function(){
				$(this.currentColor).detach();
				this.currentColor = this.blue;
				$(this.el).find("#colors").prepend( this.currentColor );
			},
			
			render: function(){
				var body;
				body = _.template( TemplateIndex );
				$(this.el).html( body );
				$("body").html(this.el);
			},
			
			renderYellow: function(){
				var body;
				body = $( _.template( TemplateYellow )() );
				return body;
			},
			
			renderRed: function(){
				var body;
				body = $( _.template( TemplateRed )() );
				return body;
			},
			
			renderBlue: function(){
				var body;
				body = $( _.template( TemplateBlue )() );
				return body;
			},
			
			handleRed: function( e ){
				console.log("handleRed")
				this.statemachine.redEvent();
			},
			
			handleYellow: function( e ){
				console.log("handleYellow")
				this.statemachine.yellowEvent();
			},
			
			handleBlue: function( e ){
				console.log("handleBlue")
				this.statemachine.blueEvent();
			}
			
		});
		
		return Index
});