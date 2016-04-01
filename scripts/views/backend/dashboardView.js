define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'text!templates/backend/dashboard.html'],
    function ($, Backbone, Marionette, _, Handlebars, tpl) {
        var BackendDashboardView = Marionette.ItemView.extend({
            template: Handlebars.compile(tpl)
        });

        return BackendDashboardView;
    });