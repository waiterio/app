define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'models/dish',
        'text!templates/backend/dishesItem.html',
        'views/backend/adminItemView'],
    function ($, Backbone, Marionette, _, Handlebars, model, tpl, AdminItemView) {
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
            template: Handlebars.compile(tpl),
            events: {
                "change @ui.input": "inputChanged",
                "paste @ui.input": "inputChanged",
                "keyup @ui.input": "inputChanged",
                "focus @ui.input": "stopAutosave",
                "click @ui.remove": "remove"
            },
            remove: function() {
                this.askRemove(polyglot.t('delete.dish', {name: this.model.get('name')}));
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