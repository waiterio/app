define([
    'jquery',
    'backbone',
    'marionette',
    'underscore',
    'collections/baseCollection'],
    function($, Backbone, Marionette, _, Collection) {
        var CategoriesCollection = Collection.extend({
            sub: '/categories'
        });

        return CategoriesCollection;
    });