define([
        'jquery',
        'backbone',
        'marionette',
        'underscore'],
    function($, Backbone, Marionette, _) {
        var OrderModel = Backbone.Model.extend({
            defaults: {
                name: ""
            },
            url: window.settings.tech.apiurl + '/categories'
        });

        return OrderModel;
    });