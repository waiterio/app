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
            calc: function(amount) {
				if(amount < 100) {
					return "0,"+ amount;
				}
				var str = amount.toString();
				str = [str.slice(0, str.length - 2), ",", str.slice(str.length - 2, str.length)].join('');
				return str;
			},
            setDragData: function(evt) {
                evt.originalEvent.dataTransfer.setData('model',JSON.stringify(this.model));
            },
            template: Handlebars.compile(tpl),
            templateHelpers: function() {
                return {price: this.calc(this.model.get("price"))};
            }
        });

        return DishesItemView;
    });