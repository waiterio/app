define([
        'jquery',
        'backbone',
        'marionette',
        'underscore'],
    function($, Backbone, Marionette, _) {
        return Backbone.Collection.extend({
            url: function() {
                return 'https://fathomless-crag-87118.herokuapp.com/api' + this.sub;
            }
        });
    });
