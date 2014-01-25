requirejs.config({
    baseUrl: '',
    paths: {
        'jquery': 'lib/jquery.min',
        'backbone': 'lib/backbone',
        'underscore': 'lib/underscore.min',
        'jquery-cookie': 'lib/jquery.cookie.min',
        'marionette': 'lib/backbone.marionette',
        'handlebars': 'lib/handlebars',
        'hbs': 'lib/hbs',
        'backbone.wreqr': 'lib/backbone.wreqr',
        'json2': 'lib/hbs/json2',
        'i18nprecompile': 'lib/hbs/i18nprecompile',
        'backbone.babysitter': 'lib/backbone.babysitter',
        'q': "lib/q.min",
        'backbone.relational': 'lib/backbone.relational',
        'parse':'lib/parse',
         'facebook': 'http://connect.facebook.net/en_US/all',
         'lib':'scripts/lib',
    },
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery','q'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'q':{
            exports:"q"
        },
        'jquery.cookie': {     //<-- cookie depends on Jquery and exports nothing
            deps: ['jquery']
        },
        'marionette': {
            exports: 'Backbone.Marionette',
            deps: ['backbone']
        },
        'facebook' : {
            exports: 'FB'
        },
        'parse':{
            exports: "Parse",
        },
    },
    
    deps: ['jquery', 'underscore'],
    hbs: {
        disableI18n: true,
    },
});
require(['facebook']);

/*define(['facebook'], function(){
  FB.init({
    appId      : 'YOUR_APP_ID',
  });
  FB.getLoginStatus(function(response) {
    console.log(response);
  });
});
*/
require(['marionette',"handlebars","parse", "scripts/routes","lib"],
    function (Marionette, Handlebars,Parse,Routes,Lib) {
       

        Marionette.TemplateCache.prototype.compileTemplate = function (rawTemplate) {
            return Handlebars.compile(rawTemplate);
        };

       /* Parse.facebookUtils.init({
            appId: "606404256104461",
           
        });*/
        Parse.initialize( "Y0m8Cgwfm2lxQHxTTqhxaydhoAstB3g9ZkKehpTG","sM5WPkrzYz3GJ760vJcAsL97rx8VV04w9cNBmBGA");
        var app = new Marionette.Application();

        app.addRegions({
            header: ".header-section",
            footer :".footer-section",
            content:".content-section",
        });

        app.addInitializer(function () {
            var routes = new Routes();
            routes.setApp(this);
            Backbone.history.start();
        });

        app.start();
        require(["views/header"],function(header){
             app.header.show(new header());
        });
       
        var currentUser = Parse.User.current();
        if (currentUser){

            Lib.navigateTo("home");
        }else{
            Lib.navigateTo("signIn");
        }

});
