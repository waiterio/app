define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'app',
        'text!templates/login.html'],
    function ($, Backbone, Marionette, _, Handlebars, App, tpl) {
        var LoginView = Marionette.ItemView.extend({
            ui: {
                "username": "[name='username']",
                "password": "[name='password']",
                "submit": "[type='submit']"
            },
            events: {
                "click @ui.submit": "login"
            },
            login: function() {
                event.preventDefault();
                Backbone.OAuth2.access(this.ui.username.val(), this.ui.password.val(), function(data) {
                    App.Router.navigate("#/backend");
                    $.ajaxSetup({
                        headers: {
                            'access-token': data.access_token
                        }
                    });
                });
                return false;
            },
            template: Handlebars.compile(tpl)
        });

        return LoginView;
    });