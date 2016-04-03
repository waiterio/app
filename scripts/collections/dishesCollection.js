define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'collections/baseCollection',
        'models/dishModel'
        ],
    function($, Backbone, Marionette, _, Collection, model) {
        var DishesCollection = Collection.extend({
            sub: '/dishes',
            model: model
        });

        return DishesCollection;
    });