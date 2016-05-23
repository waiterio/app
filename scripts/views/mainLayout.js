define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'text!templates/main.html'],
    function ($, Backbone, Marionette, _, Handlebars, tpl) {
        var MainView = Marionette.LayoutView.extend({
            ui: {
                "title": "#pageTitle",
                "logout": "#logout"
            },
            events: {
                "click @ui.logout": "logout"
            },
            initialize: function() {
                this.handleLogout();
            },
            handleLogout: function(show) {
                if(show) {
                    $(this.ui.logout).show();
                } else {
                    $(this.ui.logout).hide();
                }
            },
            logout: function() {
                event.preventDefault();
                Backbone.OAuth2.revoke();
            },
            changePageTitle: function(title) {
                this.ui.title.html(polyglot.t(title));
            },
            regions: {
                main: 'main'
            },
            template: Handlebars.compile(tpl)
        });

        return MainView;
    });