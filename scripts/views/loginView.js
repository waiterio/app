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
                "submit": "[type='submit']"
            },
            events: {
                "click @ui.submit": "login"
            },
            login: function() {
                event.preventDefault();
                Backbone.OAuth2.access(this.ui.username.val(), this.ui.password.val());
                return false;
            },
            template: Handlebars.compile(tpl)
        });

        return LoginView;
    });