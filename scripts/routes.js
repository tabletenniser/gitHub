define(['backbone','q',"lib"],
    function (Backbone,Q,Lib) {
        var routes = Backbone.Router.extend({
            routes: {

                "home":"home",
                "event/:id":"openEvent",
                "event":"newEvent",
                "signin":"signin",
                "signup":"signup",
                "":"home",
            },
            home :function(){
                this.lazyShow("views/home",this.app.content).then(function(){Lib.triggerNavEvent("home")})
            },
            newEvent:function(){
                this.lazyShow("views/event",this.app.content).then(function(){Lib.triggerNavEvent("createNew")});

            },
            openEvent :function(id){
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
               // this.previousInstance = (this.previousInstance) this.previousInstance? 
                var that =this;
                require([path],function(Class){
                    // if () 
                        if (options){
                            var instance = new Class(options);
                        }else{
                            var instance = new Class();
                        }
                        regionManager.close();
                        regionManager.reset();
                        regionManager.show(instance);
                    deferred.resolve(instance);
                });
                return deferred.promise;

            },

      
        });
        return routes;
});