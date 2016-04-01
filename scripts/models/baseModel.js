define([
        'jquery',
        'backbone',
        'marionette',
        'underscore'],
    function($, Backbone, Marionette, _) {
		return Backbone.Model.extend({
			url: function() {
				return 'http://snapsnapturtle-waiter.herokuapp.com/api' + this.sub;
			}
		});
    });
