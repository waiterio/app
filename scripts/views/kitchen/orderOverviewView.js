define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'collections/ordersCollection',
        'views/kitchen/orderOverviewItemView'],
    function ($, Backbone, Marionette, _, Handlebars, orderCollection, orderOverviewItemView) {
        var OrderOverviewView = Marionette.CollectionView.extend({
            initialize: function() {
                this.fetchOrders();

                var t = this;
                setInterval(function() {
                    t.fetchOrders();
                }, 60000);
            },
            className: "order order__list",
            collection: new orderCollection(),
            childView: orderOverviewItemView,
            childViewOptions: function(model, index) {
                return {
                    attributes: {
                        "data-id": model.get("id")
                    }
                }
            },
            fetchOrders: function() {
                this.collection.fetch({
                    data: $.param({
                        served: true,
                        sort: "-ordertimestamp"
                    })
                });
                this.render();
            },
            onDestroy: function() {

            }
        });

        return OrderOverviewView;
    });
