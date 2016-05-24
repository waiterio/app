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
                App.layout.changePageTitle("title.table.order");
                require(["views/table/tableLayout"],
                function(orderLayout) {

                    var orderLayout = new orderLayout();

                    App.layout.getRegion("main").show(orderLayout);
                });
            },
            receipt:  function () {
                console.log("Table - Receipt");
            },
            orderList: function() {
                App.layout.changePageTitle("title.kitchen.order");
                require(["views/kitchen/orderOverviewView"],
                    function(OverviewView) {

                        var OverviewView = new OverviewView();

                        App.layout.getRegion("main").show(OverviewView);
                    });
            },
            orderHistory: function() {
                console.log("Kitchen - Order History");
            },
            menu: function() {
                console.log("Kitchen - Menu");
            },
            select: function() {
                App.layout.changePageTitle("title.start");
                require(["views/selectView"],
                    function(SelectView) {

                        var SelectView = new SelectView();

                        App.layout.getRegion("main").show(SelectView);
                    });
            },
            backend: function() {
                App.layout.changePageTitle("title.backend.start");
                require(["views/backend/dashboardView"], function(view) {
                    var View = new view();

                    App.layout.getRegion("main").show(View);
                });
            },
            backendSettings: function() {
                App.layout.changePageTitle("title.backend.settings");
                require(["views/backend/settingsView"], function(view) {
                    var View = new view();

                    App.layout.getRegion("main").show(View);
                });
            },
            backendDishes: function() {
                App.layout.changePageTitle("title.backend.dishes");
                require([
                    "views/backend/tableLayout"
                ], function(view) {
                    var View = new view();

                    App.layout.getRegion("main").show(View);
                });
            },
            login: function() {
                if(!Backbone.OAuth2.isAuthenticated()) {
                    require([
                        "views/loginView"
                    ], function (view) {
                        var View = new view();

                        App.layout.getRegion("main").show(View);
                    });
                } else {
                    window.location.hash = "#";
                }
            }
        }

    });
