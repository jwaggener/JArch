define([
	"routes/routes"
],function( Router ){
	
	var JArch = {
		init: function(){
			console.log("init-ing the JArch");
			var config = {
				aspectRatio: "wide"
			};
			Router.initialize( config );
		}
	};
	return JArch;
});