requirejs.config({
    baseUrl: '',
    paths: {
        'jquery': 'lib/jquery',
        'backbone': 'lib/backbone',
        'underscore': 'lib/underscore',
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
            export: 'FB'
        }
    },
    paths: {
        'facebook': '//connect.facebook.net/en_US/all'
    },
    deps: ['jquery', 'underscore'],
    hbs: {
        disableI18n: true,
    },
});
require(['fb']);

define(['facebook'], function(){
  FB.init({
    appId      : 'YOUR_APP_ID',
  });
  FB.getLoginStatus(function(response) {
    console.log(response);
  });
});

require(['marionette',"handlebars","scripts/routes"],
    function (Marionette, Handlebars,Routes) {
        Marionette.TemplateCache.prototype.compileTemplate = function (rawTemplate) {
            return Handlebars.compile(rawTemplate);
        };

    var app = new Marionette.Application();

    app.addRegions({
        header: ".header",
        footer :".footer",
        content:".content",
    });

    app.addInitializer(function () {
        var routes = new Routes();
        Backbone.history.start();
        Eventub.Routes.setRoutes(routes);
    });

    App.start();

});
