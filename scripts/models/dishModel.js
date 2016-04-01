define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'models/baseModel'],
    function($, Backbone, Marionette, _, Model) {
        var DishModel = Model.extend({
            sub: '/orders',
            defaults: {
                name: "",
                description: "",
                price: "",
                image: ""
            }
        });

        return DishModel;
    });