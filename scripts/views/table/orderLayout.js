define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'views/table/dishesView',
        'views/table/orderView',
        'text!templates/table/orderLayout.html'],
    function ($, Backbone, Marionette, _, Handlebars, dishesView, orderView, tpl) {
        var OrderLayout = Marionette.LayoutView.extend({
            template: Handlebars.compile(tpl),
            tagName: "main",
            regions: {
                content: "#content",
                sidebar: "#sidebar"
            },
            childEvents: {
                "dish:add:order": "onDishAddOrder",
                "form:submit:order": "onShowConfirmation"
            },
            onDishAddOrder: function(childview, model) {
                this.order.triggerMethod("new:order:item", model.toJSON());
            },
            onShowConfirmation: function(childview, orderitems) {
                var t = this;

                require(["views/table/orderConfirmationView"],
                    function (ConfirmationView) {
                        t.addRegion("confirmation", "#confirmation");
                        t.showChildView("confirmation", new ConfirmationView({
                            orderitems: orderitems
                        }));
                    });
            },
            onRender: function() {
                this.dishes = new dishesView();
                this.order = new orderView();
                this.order.render();

                this.showChildView('sidebar', this.order);
                this.showChildView('content', this.dishes);
                this.dishes.collection.fetch();
            }
        });

        return OrderLayout;
    });