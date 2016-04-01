
requirejs.config({
    deps: ["main"],

    paths: {
        backbone: "vendor/backbone/backbone.min",
        marionette: "vendor/marionette/backbone.marionette",
        underscore: "vendor/underscore/underscore.min",
        jquery: "vendor/jquery/jquery.min",
        templates: "../templates",
        text: "vendor/text",
        handlebars: 'vendor/handlebars/handlebars'
    },

    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },
        jquery: {
            exports: "$"
        },
        marionette: {
            deps: ["backbone"],
            exports: "Marionette"
        },

        handlebars: {
            deps: [],
            exports: "Handlebars"
        }
    }
});