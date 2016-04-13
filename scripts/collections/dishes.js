define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'models/dish'],
    function($, Backbone, Marionette, _, model) {
        var DishesCollection = Backbone.Collection.extend({
            url: window.settings.tech.apiurl + '/dishes',
            model: model
        });

        return DishesCollection;
    });