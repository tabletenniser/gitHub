define(['backbone'],
    function (Backbone) {
        var routes = Backbone.Router.extend({
            routes: {
                "home":"home",
                "createNew":"createNew",
                "event/:id":"event",
            },
            home :function(){

            },
            createNew:function(){


            },
            event :function(id){

            },

      
        });
        return routes;
});