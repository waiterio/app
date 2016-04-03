define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'collections/baseCollection',
        'models/orderModel'
        ],
    function($, Backbone, Marionette, _, Collection, model) {
        var OrderItemsCollection = Collection.extend({
            sub: '/orders',
            model: model
        });

        return OrderItemsCollection;
    });