define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'views/table/orderItemView',
        'collections/dishesCollection',
        'models/orderModel'],
    function ($, Backbone, Marionette, _, Handlebars, orderItemView, dishesCollection, orderModel) {
        var OrderView = Marionette.CollectionView.extend({
            initialize: function() {
                this.$el.prepend("<div id='toggle'>&#x1f45c;</div>");
                this.$el.append("<div class='order__wrapper'></div>");
                this.$el.append("<button id='submitOrder'>Bestellen</button>");
            },
            ui: {
                "toggle": "#toggle"
            },
            events: {
                "click @ui.toggle": "toggleSidebar",
                "drop": "droppedDishInArea",
                "dragover": "dragedDishOverArea"
            },
            toggleSidebar: function() {
                this.$el.toggleClass("out");
            },
            className: "order order--zone",
            collection: new dishesCollection(),
            collectionEvents: {
                "reset": function() {
                    this.amount = 0;
                    this.toggleButtonAmount();
                }
            },
            childView: orderItemView,
            childEvents: {
                "add:orderitem": "addOrderItem",
                "remove:orderitem": "removeOrderItem"
            },
            triggers: {
                "click #submitOrder": "submit:order"
            },
            droppedDishInArea: function(evt) {
                if (evt.preventDefault) {
                    evt.preventDefault();
                }
                evt.originalEvent.dataTransfer.dropEffect = 'copy';
                this.triggerMethod("new:order:item", JSON.parse(evt.originalEvent.dataTransfer.getData('model')));

                return false;
            },
            dragedDishOverArea: function(evt) {
                evt.preventDefault();
            },
            amount: 0,
            toggleButtonAmount: function() {
                if(this.amount != 0) {
                    $(this.ui.toggle).html(this.amount);
                } else {
                    $(this.ui.toggle).html("&#x1f45c;");
                }
            },
            addOrderItem: function(child) {
                if(typeof child !== 'undefined') {
                    var m = child.model.set("count", parseInt(child.model.get("count"))+1);
                    this.collection.set(m, {remove: false});
                }
                this.amount++;
                this.toggleButtonAmount();
            },
            removeOrderItem: function (child) {
                if(typeof child !== 'undefined') {
                    if(parseInt(child.model.get("count")) > 1) {
                        var m = child.model.set("count", parseInt(child.model.get("count")) - 1);
                        this.collection.set(m, {remove: false});
                    } else {
                        this.collection.remove(child.model);
                    }
                }
                this.amount--;
                this.toggleButtonAmount();
            },
            onNewOrderItem: function(model) {
                this.addOrderItem();

                var orderItem = _.findWhere(this.collection.models, {id: model.id});

                if(typeof orderItem === 'undefined') {
                    model.count = 1;
                    this.collection.add(model);
                } else {
                    orderItem.set("count",parseInt(orderItem.get("count")) + 1);
                    this.collection.set(orderItem, {remove: false});
                }
            },
            order: new orderModel(),
            onSubmitOrder: function() {
                var t = this;
                var orderItems = [];
                var detailedOrderItems = [];
                _.each(this.collection.models, function(model) {
                    for(var i=1;i<=parseInt(model.get("count"));i++) {
                        orderItems.push({dishes_id: model.id});
                        detailedOrderItems.push(this.collection.get(model.id).toJSON());
                    }
                }, this);

                this.order.set({
                    tablenumber: Math.round(Math.random() * 20),
                    ordertimestamp: new Date(),
                    orderitems: orderItems
                });

                this.order.save(this.order.toJSON(), {
                    dataType: 'html',
                    success: function() {
                        t.triggerMethod("form:submit:order", detailedOrderItems);
                    },
                    error: function(model, response) {
                        alert("cannot submit order");
                        console.log(response);
                    }
                });
            },
            onFormSubmitOrder: function() {
                this.collection.reset();
                this.order.clear();
            },
            attachHtml: function(collectionView, childView, index){
                if (collectionView.isBuffering) {
                    collectionView._bufferedChildren.splice(index, 0, childView);
                }
                else {
                    if (!collectionView._insertBefore(childView, index)){
                        this.$el.children(".order__wrapper").append(childView.el);
                    }
                }
            }
        });

        return OrderView;
    });