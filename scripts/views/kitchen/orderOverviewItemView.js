define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'text!templates/kitchen/orderItem.html'],
    function ($, Backbone, Marionette, _, Handlebars, tpl) {
        var DishesItemView = Marionette.ItemView.extend({
            initialize: function() {
                var t = this;
                this.model.fetch({success: function() {
                    t.formatTimestamp("ordertimestamp");
                    t.render();
                }});
            },
            formatTimestamp: function(field) {
                var timestamp = new Date(this.model.get(field));
                var now = new Date();

                var diffMs = (now - timestamp); // milliseconds between now & Christmas
                var diffDays = Math.round(diffMs / 86400000); // days
                var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
                var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

                var formattedTimeSince = diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes";

                this.model.set("f"+ field, formattedTimeSince);
            },
            updateTimestamp: function() {

            },
            className: 'order__list--item',
            template: Handlebars.compile(tpl)
        });

        return DishesItemView;
    });