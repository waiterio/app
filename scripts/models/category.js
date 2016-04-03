define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'models/base'],
    function($, Backbone, Marionette, _, Model) {
        var OrderModel = Model.extend({
            sub: '/orders'
        });

        return OrderModel;
    });