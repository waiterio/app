define([
        'jquery',
        'underscore',
        'backbone',
        'backboneoauth',
        'marionette',
        'handlebars',
        'polyglot',
        'models/settings',
        'models/language',
        'accounting'
    ],
    function ($, _, Backbone, BackboneOauth, Marionette, Handlebars, Polyglot, SettingsModel, LanguageModel, accounting) {
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

                    accounting.settings.currency = model.get("geo").currency;

                    var language = new LanguageModel({code: model.get("geo").locale});
                    language.fetch({
                        success: function(phrases) {
                            window.polyglot = new Polyglot({
                                phrases: phrases.toJSON(),
                                locale: model.get("geo").locale
                            });



                            Backbone.OAuth2 = new BackboneOauth({
                                accessUrl   : model.get('tech').url + '/auth/token',
                                refreshUrl  : model.get('tech').apiurl + '/refresh',
                                revokeUrl   : model.get('tech').apiurl + '/revoke'
                            });

                            if(!Backbone.OAuth2.isAuthenticated()) {
                                window.location.hash = '#/login';
                            } else {
                                $.ajaxSetup({
                                    headers: {
                                        'access-token': JSON.parse(window.localStorage.getItem("__oauth2")).access_token
                                    },
                                    error: function (jqXHR, textStatus, errorThrown) {
                                        if (jqXHR.status == 401 || jqXHR.status == 403) {
                                            window.location.hash.replace('#/login');
                                        }
                                    }
                                });
                            }

                            Backbone.history.start({root: "/"});
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
