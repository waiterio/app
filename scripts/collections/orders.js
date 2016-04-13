define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'models/order'
        ],
    function($, Backbone, Marionette, _, model) {
        var OrderItemsCollection = Backbone.Collection.extend({
            url: window.settings.tech.apiurl + '/orders',
            model: model
        });

        return OrderItemsCollection;
    });