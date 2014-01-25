require(['backbone'],function(Backbone){
	var Lib ={};
	Lib.Events = _.clone(Backbone.Events);
	Lib.Navigation = {},

	var navigationConfig ={
		'SignIn':'signin'

	};

	//bind navigation config to navigation
	for (var key in navigationConfig){
		Lib.Navigation['to'+key] = function(){
			window.location.href=navigationConfig[key];
		}
	}

})