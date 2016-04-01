define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'collections/baseCollection'],
    function($, Backbone, Marionette, _, Collection) {
        var DishesCollection = Collection.extend({
            sub: '/dishes'
        });

        return DishesCollection;
    });