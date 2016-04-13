define([
    'jquery',
    'backbone',
    'marionette',
    'underscore',
    'models/category'],
    function($, Backbone, Marionette, _, model) {
        var CategoriesCollection = Backbone.Collection.extend({
            url: window.settings.tech.apiurl + '/categories',
            model: model
        });

        return CategoriesCollection;
    });