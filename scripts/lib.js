define(['backbone','parse'],function(Backbone,Parse){
	var Lib ={};
	Lib.Events = _.clone(Backbone.Events);
	Lib.Navigation = {};

	var navigationConfig ={
		'signIn':'signin',
		'createNew':"createNew",
		'home':'home',
		"event":"event",
        "signUp":"signup",

	};

	//bind navigation config to navigation
	
	Lib.navigateTo = function(key,id){
		if (id) {
			window.location.hash=navigationConfig[key]+"/"+id;
		}else{
			window.location.hash=navigationConfig[key];
		}
	};
	Lib.triggerNavEvent = function(url,id){
		this.Events.trigger('url:'+url,id);
	};
	Lib.getCurrentUser = function(){
		var user = Parse.User.current();
		if (user){
			return user;
		}else{
			Lib.navigateTo('signIn');
			return null;
		}

	};
	return Lib;

});