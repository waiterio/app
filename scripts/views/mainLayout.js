define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'app',
        'text!templates/main.html'],
    function ($, Backbone, Marionette, _, Handlebars, App, tpl) {
        var MainView = Marionette.LayoutView.extend({
            ui: {
                "title": "#pageTitle",
                "logout": "#logout"
            },
            events: {
                "click @ui.logout": "logout"
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
                var t = this;
                Backbone.OAuth2.revoke(function() {
                    t.handleLogout(false);
                });
            },
            changePageTitle: function(title) {
                this.ui.title.html(polyglot.t(title));
            },
            regions: {
                main: 'main'
            },
            onRender: function() {
                this.handleLogout(false);
            },
            template: Handlebars.compile(tpl)
        });

        return MainView;
    });