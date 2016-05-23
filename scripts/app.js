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
        'accounting',
        'views/mainLayout'
    ],
    function ($, _, Backbone, BackboneOauth, Marionette, Handlebars, Polyglot, SettingsModel, LanguageModel, accounting, mainLayout) {
        Backbone.Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
            return Handlebars.compile(rawTemplate);
        };

        var App = new Backbone.Marionette.Application();

        App.addRegions({
            app: '#app'
        });

        App.addInitializer(function(options) {

        });

        App.on("start", function(){
            this.layout = new mainLayout();
            this.app.show(this.layout);

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
                                refreshUrl  : model.get('tech').url + '/auth/refresh',
                                revokeUrl   : model.get('tech').url + '/auth/revoke'
                            });


                            if(!Backbone.OAuth2.isAuthenticated()) {
                                window.location.hash = '#/login';
                            } else {
                                App.layout.handleLogout(true);
                                $.ajaxSetup({
                                    headers: {
                                        'access-token': JSON.parse(window.localStorage.getItem("__oauth2")).access_token
                                    },
                                    error: function (jqXHR, textStatus, errorThrown) {
                                        if (jqXHR.status == 401) {
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

        return App;

    });
