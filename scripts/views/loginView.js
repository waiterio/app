define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'text!templates/login.html'],
    function ($, Backbone, Marionette, _, Handlebars, tpl) {
        var LoginView = Marionette.ItemView.extend({
            ui: {
                "username": "[name='username']",
                "password": "[name='password']",
                "logout": "#logout",
                "submit": "[type='submit']"
            },
            events: {
                "click @ui.logout": "logout",
                "click @ui.submit": "login"
            },
            login: function() {
                event.preventDefault();
                Backbone.OAuth2.access(this.ui.username.val(), this.ui.password.val());
                return false;
            },
            logout: function() {
                event.preventDefault();
                Backbone.OAuth2.revoke();
            },
            template: Handlebars.compile(tpl)
        });

        return LoginView;
    });