define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'collections/base',
        'models/order'
        ],
    function($, Backbone, Marionette, _, Collection, model) {
        var OrderItemsCollection = Collection.extend({
            sub: '/orders',
            model: model
        });

        return OrderItemsCollection;
    });