define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'models/dish',
        'behaviors/destroyWarning',
        'behaviors/focusoutSave',
        'text!templates/backend/dishesItem.html'],
    function ($, Backbone, Marionette, _, Handlebars, model, destroyWarning, focusoutSave, tpl) {
        var DishesItemView = Marionette.ItemView.extend({
            attributes: function() {
                var options = {
                    "data-cid": this.model.cid
                };

                if(!this.model.isNew()) {
                    options["data-id"] = this.model.get("id");
                } else {
                    options["data-new"] = "true";
                }

                return options;
            },
            className: 'dishes--item backend',
            ui: {
                "remove": ".remove",
                "name": "[name='name']",
                "description": "[name='description']",
                "price": "[name='price']",
                "image": "[name='image']",
                "input": "input, textarea"
            },
            behaviors: {
                DestroyWarning: {
                    behaviorClass: destroyWarning,
                    message: "destroy.dish"
                },
                FocusOutSave: {
                    behaviorClass: focusoutSave
                }
            },
            getUIdata: function() {
                return {
                    "image": this.ui.image.val(),
                    "name": this.ui.name.val(),
                    "price": this.model.accounting.unformat(this.ui.price.val()),
                    "description": this.ui.description.val()
                };
            },
            template: Handlebars.compile(tpl),
            templateHelpers: function() {
                return {
                    price: this.model.accounting.formatMoney(this.model.get("price") / 100)
                }
            },
            modelEvents: {
                "sync": "onSynced"
            },
            onSynced: function() {
                this.$el.css("background", "green");

                var t = this;
                setTimeout(function() {
                    t.$el.css("background", "inherit");
                }, 300);

                this.render();
            },
            onDestroy: function() {
                this.model.destroy();
            }
        });

        return DishesItemView;
    });