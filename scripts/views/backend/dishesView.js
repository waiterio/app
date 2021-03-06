define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'views/backend/dishesItemView'],
    function ($, Backbone, Marionette, _, Handlebars, dishesItemView) {
        var DishesView = Marionette.CollectionView.extend({
            initialize: function(options) {
                this.category = options.category;
            },
            className: "dishes",
            childView: dishesItemView,
            filter: function (child, index, collection) {
                return child.get('categories_id') == this.category;
            },
            onChildviewNewModelSaved: function() {
                this.addItem();
            },
            addItem: function() {
                this.collection.add(new this.collection.model({categories_id: this.category}));
            },
            tagName: "form"
        });

        return DishesView;
    });
