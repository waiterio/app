define([
    'jquery',
    'backbone',
    'marionette',
    'underscore',
    'collections/base'],
    function($, Backbone, Marionette, _, Collection) {
        var CategoriesCollection = Collection.extend({
            sub: '/categories'
        });

        return CategoriesCollection;
    });