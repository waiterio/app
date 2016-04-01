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
        var orderLayout = Marionette.LayoutView.extend({
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
            onShowConfirmation: function(childview, model) {
                var t = this;
                console.log(model);
                require(["views/table/orderConfirmationView"],
                    function(ConfirmationView) {
                        t.showChildView("content", new ConfirmationView({
                            orderitems: model
                        }));
                    });
                this.removeRegion("sidebar");
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

        return orderLayout;
    });