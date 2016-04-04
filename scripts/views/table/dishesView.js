define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'views/table/dishesItemView'],
    function ($, Backbone, Marionette, _, Handlebars, dishesItemView) {
        var DishesView = Marionette.CollectionView.extend({
            initialize: function(options) {
                this.filtercategory = options.category;
            },
            className: "dishes",
            childView: dishesItemView,
            childViewOptions: function(model, index) {
                return {
                    attributes: {
                        "data-id": model.get("id"),
                        "draggable": "true"
                    }
                }
            },
            filter: function (child, index, collection) {
                return child.get('categories_id') == this.filtercategory;
            },
            childEvents: {
                "add:order": "DishAddOrder"
            },
            DishAddOrder: function(child, message) {
                var id = $(child.el).data("id");
                this.triggerMethod("dish:add:order", this.collection.get(id));
            }
        });

        return DishesView;
    });
