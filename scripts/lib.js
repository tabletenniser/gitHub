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
	Lib.ModelSave = function(model,data,success,error){
		if (model){
			model.save(data,{
				success:success,
				error:error,

			});
		}
	};
	Lib.Collection = Parse.Collection.extend({
		fetch:function(options){
			options = (options) ? options:{};
			if (options.queryEnforce==false){
				return Parse.Collection.prototype.fetch.apply(this,options);
			}
			if (query){
				return Parse.Collection.prototype.fetch.apply(this,options);
			}else{
				throw new Error('Query enforce, no query found');
			}
		},
	});

	Lib.DataStore={};
	var Store={}
	Lib.DataStore.save = function(key,parseObject){
		if(key){
			Store[key] = parseObject; 
		}else{
			throw new Error("no object key");
		}

	};
	Lib.DataStore.find = function(key){
		if (key){
			return Store[key];
		}else{
			throw new Error("no given key");
		}
	}

	return Lib;

});