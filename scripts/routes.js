define(['backbone'],
    function (Backbone) {
        var routes = Backbone.Router.extend({
            routes: {
                "home":"home",
                "createNew":"createNew",
                "event/:id":"event",
                "signin":"signin",
                "signup":"signup",
            },
            home :function(){
                this.lazyShow("views/home",this.app.content);
            },
            createNew:function(){
                this.lazyShow("views/createNew",this.app.content);

            },
            event :function(id){
                this.lazyShow("views/event",this.app.content,id);
            },

            signin:function(){
                this.lazyShow("views/signin",this.app.content);

            },
            signup:function(){
                this.lazyShow("views/signup",this.app.content);

            },
            setApp:function(app){
                this.app = app;
            },

            lazyShow:function(path,regionManager,options,success){
                require([path],function(Class){
                    if (options){
                        var instance = new Class(options);
                    }else{
                        var instance = new Class();
                    }
                    regionManager.show(instance);
                });

            },

      
        });
        return routes;
});