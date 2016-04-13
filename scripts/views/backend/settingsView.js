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
            ui: {
                "submit": "[type='submit']"
            },
            events: {
                "click @ui.submit": "submit"
            },
            model: new settingsModel(window.settings),
            template: Handlebars.compile(tpl),
            submit: function() {
                this.model.save();
            }
        });

        return DishesView;
    });
