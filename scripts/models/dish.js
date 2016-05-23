define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'accounting'],
    function($, Backbone, Marionette, _, accounting) {
        var DishModel = Backbone.Model.extend({
            sub: "/dishes",
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