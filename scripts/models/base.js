define([
        'jquery',
        'backbone',
        'marionette',
        'underscore'],
    function($, Backbone, Marionette, _) {
		return Backbone.Model.extend({
			urlRoot: function() {
				return window.settings.tech.apiurl + this.sub;
			}
		});
    });
