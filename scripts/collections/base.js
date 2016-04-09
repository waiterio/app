define([
        'jquery',
        'backbone',
        'marionette',
        'underscore'],
    function($, Backbone, Marionette, _) {
        return Backbone.Collection.extend({
            url: function() {
                return window.settings.tech.apiurl + this.sub;
            }
        });
    });
