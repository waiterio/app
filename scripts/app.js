define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'handlebars',
        'polyglot',
        'models/settings',
        'models/language'
    ],
    function ($, _, Backbone, Marionette, Handlebars, Polyglot, SettingsModel, LanguageModel) {
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
            var settings = new SettingsModel();
            settings.fetch({
                success: function(model) {
                    window.settings = model.toJSON();

                    var language = new LanguageModel({code: model.get("locale")});
                    language.fetch({
                        success: function(phrases) {
                            window.polyglot = new Polyglot({
                                phrases: phrases.toJSON(),
                                locale: model.get("locale")
                            });

                            Backbone.history.start({ root: "/"});
                        }
                    });
                }
            });
        });

        App.vent.on("setTitle", function(title) {
            $("#pageTitle").html(polyglot.t(title));
        });

        return App;

    });
