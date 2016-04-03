define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'app'
    ],
    function($, _, Backbone, Marionette, App) {
        return {
            order: function () {
                App.vent.trigger("setTitle","title.table.order");
                require(["views/table/orderLayout"],
                function(orderLayout) {

                    var orderLayout = new orderLayout();

                    App.main.show(orderLayout);
                });
            },

            receipt:  function () {
                console.log("Table - Receipt");
            },
            orderList: function() {
                App.vent.trigger("setTitle","title.kitchen.order");
                require(["views/kitchen/orderOverviewView"],
                    function(OverviewView) {

                        var OverviewView = new OverviewView();

                        App.main.show(OverviewView);
                    });
            },
            orderHistory: function() {
                console.log("Kitchen - Order History");
            },
            menu: function() {
                console.log("Kitchen - Menu");
            },
            select: function() {
                App.vent.trigger("setTitle","title.start");
                require(["views/selectView"],
                    function(SelectView) {

                        var SelectView = new SelectView();

                        App.main.show(SelectView);
                    });
            },
            backend: function() {
                App.vent.trigger("setTitle", "title.backend.start");
                require(["views/backend/dashboardView"], function(view) {
                    var View = new view();

                    App.main.show(View);
                });
            },
            backendDishes: function() {
                App.vent.trigger("setTitle", "title.backend.dishes");
                require([
                    "views/backend/adminView",
                    "models/dish",
                    "collections/dishes",
                    "views/backend/dishesItemView",
                    "text!templates/backend/dishesItem.html"
                ], function(view, model, collection, childView, tpl) {
                    var options = {
                        model: model,
                        collection: new collection(),
                        childTemplate: tpl,
                        childView: childView,
                        type: "dishes"
                    };
                    var View = new view(options);
                    View.collection.fetch({
                        success: function() {
                            View.triggerMethod("collection:fetched");
                        }
                    });
                    App.main.show(View);
                });
            }
        }

    });