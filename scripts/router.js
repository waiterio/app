define([
        "backbone",
        "marionette",
        "controller"
    ],
    function (Backbone, Marionette, controller){

        "use strict";

        var AppRouter = Backbone.Marionette.AppRouter.extend({
            appRoutes: {
                "table" : "order",
                "table/order" : "order",
                "table/receipt" : "receipt",
                "kitchen": "orderList",
                "kitchen/orders" : "orderList",
                "kitchen/orders/history" : "orderHistory",
                "kitchen/menu": "menu",
                "login": "login",
                "backend": "backend",
                "backend/dishes": "backendDishes",
                "backend/users": "backendUsers",
                "backend/settings": "backendSettings",
                "*actions": "select"
            }
        });

        return new AppRouter({controller: controller});

    });