define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'collections/dishes',
        'views/table/dishesItemView'],
    function ($, Backbone, Marionette, _, Handlebars, dishesCollection, dishesItemView) {
        var DishesView = Marionette.CollectionView.extend({
            className: "dishes",
            collection: new dishesCollection(),
            childView: dishesItemView,
            childViewOptions: function(model, index) {
                return {
                    attributes: {
                        "data-id": model.get("id"),
                        "draggable": "true"
                    }
                }
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
