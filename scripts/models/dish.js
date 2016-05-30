define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'accounting'],
    function($, Backbone, Marionette, _, accounting) {
        var DishModel = Backbone.Model.extend({
            urlRoot:  window.settings.tech.apiurl + "/dishes",
            defaults: {
                name: "",
                description: "",
                price: 0,
                image: ""
            },
            accounting: accounting,
            validate: function(attributes, options) {

            }
        });

        return DishModel;
    });