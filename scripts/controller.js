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
                require(["views/table/tableLayout",
                        "views/layout"],
                function(view, mainLayout) {
                    App.vent.trigger("changePage","title.table.order", view, mainLayout);
                });
            },
            receipt:  function () {
                console.log("Table - Receipt");
            },
            orderList: function() {
                require(["views/kitchen/orderOverviewView",
                        "views/layout"],
                    function(view, mainLayout) {
                        App.vent.trigger("changePage","title.kitchen.order", view, mainLayout);
                    });
            },
            orderHistory: function() {
                console.log("Kitchen - Order History");
            },
            menu: function() {
                console.log("Kitchen - Menu");
            },
            select: function() {
                require(["views/selectView",
                    "views/layout"],
                function(view, mainLayout) {
                    App.vent.trigger("changePage","title.start", view, mainLayout);
                });
            },
            backend: function() {
                require(["views/backend/dashboardView",
                    "views/backend/layout"],
                    function(view, backendLayout) {
                        App.vent.trigger("changePage","title.backend.start", view, backendLayout);
                    });
            },
            backendSettings: function() {
                require(["views/backend/settingsView",
                        "views/backend/layout"],
                    function(view, backendLayout) {
                        App.vent.trigger("changePage","title.backend.settings", view, backendLayout);
                    });
            },
            backendUsers: function() {
                require([
                   "views/backend/usersView",
                        "views/backend/layout"],
                    function(view, backendLayout) {
                        App.vent.trigger("changePage","title.backend.users", view, backendLayout);
                    });
            },
            backendDishes: function() {
                require([
                    "views/backend/tableLayout",
                        "views/backend/layout"],
                    function(view, backendLayout) {
                        App.vent.trigger("changePage","title.backend.dishes", view, backendLayout);
                    });
            },
            login: function() {
                if(!Backbone.OAuth2.isAuthenticated()) {
                    require([
                        "views/loginView",
                            "views/backend/layout"],
                        function(view, backendLayout) {
                            App.vent.trigger("changePage","", view, backendLayout);
                        });
                } else {
                    window.location.hash = "#";
                }
            }
        }

    });
