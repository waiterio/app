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
            model: new settingsModel(window.settings),
            template: Handlebars.compile(tpl)
        });

        return DishesView;
    });
