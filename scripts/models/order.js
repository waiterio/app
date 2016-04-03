define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'models/base'],
    function($, Backbone, Marionette, _, Model) {
        var OrderModel = Model.extend({
            sub: '/orders',
            defaults: {
                "tablenumber": 1,
                "ordertimestamp": null,
                "servingtimestamp": null,
                "orderitems": []
            }
        });

        return OrderModel;
    });