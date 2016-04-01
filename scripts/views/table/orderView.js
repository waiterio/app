define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'models/orderModel',
        'text!templates/table/order.html'],
    function ($, Backbone, Marionette, _, Handlebars, orderModel, tpl) {
        var OrderView = Marionette.ItemView.extend({
            className: "order sidebar",
            model: new orderModel(),
            template: Handlebars.compile(tpl),
            templateHelpers: function() {
                return {
                    orderItems: this.uiOrderItems
                }
            },
            triggers: {
                "click #submitOrder": "submit:order"
            },
            events: {
                "drop": "droppedDishInArea",
                "dragover": "dragedDishOverArea"
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
            uiOrderItems: [],
            getUiOrderItemById: function(id) {
                var i = _.find(this.uiOrderItems, function(item) {
                    return item.id === id;
                }, id);

                return i;
            },
            onNewOrderItem: function(model) {
                var uiModel = model;

                var item = this.getUiOrderItemById(uiModel.id);

                if(typeof item === 'undefined') {
                    uiModel.count = 1;
                    this.uiOrderItems.push(uiModel);
                } else {
                    item.count++;
                }

                this.model.get("orderitems").push({dishes_id: model.id});

                this.render();
            },
            onSubmitOrder: function() {
                var t = this;
                this.model.save(this.model.toJSON(), {
                    dataType: 'html',
                    success: function() {
                        t.triggerMethod("form:submit:order", t.uiOrderItems);
                    },
                    error: function(model, response) {
                        alert("cannot submit order");
                        console.log(response);
                    }
                });

            }
        });

        return OrderView;
    });