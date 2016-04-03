define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'handlebars',
        'polyglot'
    ],
    function ($, _, Backbone, Marionette, Handlebars, Polyglot) {
        Backbone.Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
            return Handlebars.compile(rawTemplate);
        };

        var App = new Backbone.Marionette.Application();

        App.addRegions({
            main: '#main'
        });

        App.addInitializer(function(options) {

        });

        App.on("start", function(){
            $.getJSON('settings/settings.json', function(data) {
                window.settings = data;

                $.getJSON('settings/lang/'+ data.locale +".json", function(phrases) {
                    window.polyglot = new Polyglot(
                        {
                            phrases: phrases,
                            locale: data.locale
                        }
                    );

                    Backbone.history.start({ root: "/"});
                });
            });

        });

        App.vent.on("setTitle", function(title) {
            $("#pageTitle").html(polyglot.t(title));
        });

        return App;

    });
