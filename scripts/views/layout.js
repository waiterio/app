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
                "title": "#pageTitle"
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