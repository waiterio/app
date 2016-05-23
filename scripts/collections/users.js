define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'models/user'],
    function($, Backbone, Marionette, _, model) {
        return Backbone.Collection.extend({
            url: function() {
                return window.settings.tech.apiurl + '/users';
            },
            model: model
        });
    });
