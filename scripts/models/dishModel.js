define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'models/baseModel'],
    function($, Backbone, Marionette, _, Model) {
        var DishModel = Model.extend({
            sub: '/dishes',
            defaults: {
                name: "",
                description: "",
                price: 0,
                image: ""
            },
            validate: function() {

            },
            initialize: function() {
                this.formatPrice(this.get("price"));
            },
            formatPrice: function(amount) {
                this.set("price", parseInt(amount) / 100);
            },
            unformatPrice: function(amount) {
                this.set("price", amount * 100);
            }
        });

        return DishModel;
    });