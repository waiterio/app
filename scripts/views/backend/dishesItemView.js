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
            templateHelpers: function() {
                return {
                    price: this.model.accounting.formatMoney(this.model.get("price") / 100)
                }
            },
            events: {
                "focusout @ui.input": "checkIsChanging",
                "click @ui.remove": "removeClicked"
            },
            saved: function() {
                this.$el.css("background", "green");

                var t = this;
                setTimeout(function() {
                    t.$el.css("background", "inherit");
                }, 300);

                this.render();
            },
            removeClicked: function() {
                this.askRemove(polyglot.t('delete.dish', {name: this.model.get('name')}));
            },
            updateModel: function () {
                this.model.set({
                    name: this.ui.name.val(),
                    description: this.ui.description.val(),
                    image: this.ui.image.val(),
                    price: this.model.accounting.unformat(this.ui.price.val())
                });
            }
        });

        return DishesItemView;
    });