define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'text!templates/table/dishesItem.html'],
    function ($, Backbone, Marionette, _, Handlebars, tpl) {
        var DishesItemView = Marionette.ItemView.extend({
            className: 'dishes--item',
            triggers: {
                "click": "add:order"
            },
            events: {
                "dragstart": "setDragData"
            },
            setDragData: function(evt) {
                evt.originalEvent.dataTransfer.setData('model',JSON.stringify(this.model));
            },
            template: Handlebars.compile(tpl),
            templateHelpers: function() {
                return { price: this.model.accounting.formatMoney(this.model.get("price") / 100) }
            }
        });

        return DishesItemView;
    });