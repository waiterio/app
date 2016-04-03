define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'text!templates/table/orderItem.html'],
    function ($, Backbone, Marionette, _, Handlebars, tpl) {
        var OrderItemView = Marionette.ItemView.extend({
            className: 'order--item',
            template: Handlebars.compile(tpl),
            ui: {
                "add": ".amount--increase",
                "remove": ".amount--decrease"
            },
            triggers: {
                "click @ui.add": "add:orderitem",
                "click @ui.remove": "remove:orderitem"
            },
            modelEvents: {
                "change": "changed"
            },
            changed: function() {
                this.render();
            }
        });

        return OrderItemView;
    });