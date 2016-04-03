define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'collections/base',
        'models/dish'
        ],
    function($, Backbone, Marionette, _, Collection, model) {
        var DishesCollection = Collection.extend({
            sub: '/dishes',
            model: model
        });

        return DishesCollection;
    });