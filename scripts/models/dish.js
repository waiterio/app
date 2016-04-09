define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'accounting',
        'models/base'],
    function($, Backbone, Marionette, _, accounting, Model) {
        var DishModel = Model.extend({
            sub: '/dishes',
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