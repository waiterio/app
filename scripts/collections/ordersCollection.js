define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'collections/baseCollection'],
    function($, Backbone, Marionette, _, Collection) {
        var OrderItemsCollection = Collection.extend({
            sub: '/orders'
        });

        return OrderItemsCollection;
    });