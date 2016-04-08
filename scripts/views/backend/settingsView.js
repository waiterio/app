define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'models/settings',
        'text!templates/backend/settings.html'],
    function ($, Backbone, Marionette, _, Handlebars, settingsModel, tpl) {
        var DishesView = Marionette.ItemView.extend({
            initialize: function() {
            },
            model: new settingsModel(),
            template: Handlebars.compile(tpl)
        });

        return DishesView;
    });
