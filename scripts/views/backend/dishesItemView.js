define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'views/backend/adminItemView'],
    function ($, Backbone, Marionette, _, Handlebars, AdminItemView) {
        var DishesItemView = AdminItemView.extend({
            className: 'dishes--item',
            ui: {
                "remove": ".remove",
                "name": "[name='name']",
                "description": "[name='description']",
                "price": "[name='price']",
                "image": "[name='image']",
                "input": "input, textarea"
            },
            events: {
                "change @ui.input": "inputChanged",
                "paste @ui.input": "inputChanged",
                "keyup @ui.input": "inputChanged",
                "focus @ui.input": "stopAutosave",
                "click @ui.remove": "askRemove"
            },
            updateModel: function () {
                this.model.unformatPrice(this.ui.price.val());
                this.model.set({
                    name: this.ui.name.val(),
                    description: this.ui.description.val(),
                    image: this.ui.image.val()
                });
            }
        });

        return DishesItemView;
    });