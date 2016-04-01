define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'text!templates/table/confirmation.html'],
    function ($, Backbone, Marionette, _, Handlebars, tpl) {
        var OrderConfirmationView = Marionette.ItemView.extend({
            initialize: function(options) {
                this.orderedItems = options.orderitems;
            },
            templateHelpers: function() {
                return { orderitems: this.orderedItems }
            },
            template: Handlebars.compile(tpl)
        });

        return OrderConfirmationView;
    });