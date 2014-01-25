define(['backbone','q',"lib"],
    function (Backbone,Q,Lib) {
        var routes = Backbone.Router.extend({
            routes: {
                "home":"home",
                "event/:id":"openEvent",
                "event":"newEvent",
                "signin":"signin",
                "signup":"signup",
            },
            home :function(){
                this.lazyShow("views/home",this.app.content).then(function(){Lib.triggerNavEvent("home")})
            },
            openEvent:function(){
                this.lazyShow("views/event",this.app.content).then(function(){Lib.triggerNavEvent("createNew")});

            },
            newEvent :function(id){
                this.lazyShow("views/event",this.app.content,{eventId:id}).then(function(){Lib.triggerNavEvent("event",id)});
            },

            signin:function(){
                this.lazyShow("views/signin",this.app.content).then(function(){Lib.triggerNavEvent("signin")});

            },
            signup:function(){
                this.lazyShow("views/signup",this.app.content).then(function(){Lib.triggerNavEvent("signup")});

            },
            setApp:function(app){
                this.app = app;
            },
           
            lazyShow:function(path,regionManager,options,success){
                
                var deferred = Q.defer();
                require([path],function(Class){
                    if (options){
                        var instance = new Class(options);
                    }else{
                        var instance = new Class();
                    }
                    regionManager.show(instance);
                    deferred.resolve(instance);
                });
                return deferred.promise;

            },

      
        });
        return routes;
});