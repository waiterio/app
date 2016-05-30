define([
        'jquery',
        'backbone',
        'marionette',
        'underscore'],
    function($, Backbone, Marionette, _) {
        var OrderModel = Backbone.Model.extend({
            urlRoot: window.settings.tech.apiurl + '/orders',
            defaults: {
                "tablenumber": 1,
                "ordertimestamp": null,
                "servingtimestamp": null,
                "orderitems": []
            }
        });

        return OrderModel;
    });