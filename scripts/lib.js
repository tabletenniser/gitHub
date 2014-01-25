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
			if (this.query){
				return Parse.Collection.prototype.fetch.apply(this,options);
			}else{
				throw new Error('Query enforce, no query found');
			}
		},
	});

	
	var Store={};
	Lib.DataStore ={
		save : function(key,parseObject){
			if(key){
				Store[parseObject.constructor][key] = parseObject; 
			}else{
				throw new Error("no object key");
			}

		},
		find: function(key,objectClass){
			if (key){
				var set = Store[objectClass];
				if (set){
					return set[key];
				}else{
					return null;
				}
			}else{
				throw new Error("no given key");
			}
		},
	};
	Lib.Object = function () {
       Parse.Object.apply(this,arguments);
    };

    Lib.Object.prototype = new Parse.Object();
    Lib.Object.prototype.constructor = Lib.Object;

	_.extend(Lib.Object.prototype,{
		newQuery:function(){
			return (new Parse.Query(this));
		},
	});

	 Lib.Object.extend = function(protoProps, staticProps) {
        var parent = this;
        var child;
        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function(){ return parent.apply(this, arguments); };
        }
        _.extend(child, parent, staticProps);      
 
        var Surrogate = function(){ this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;
               
 
        if (protoProps) _.extend(child.prototype, protoProps);
             
 
        child.__super__ = parent.prototype;

        return child;
    }

	return Lib;

});