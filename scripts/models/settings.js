define([
        'jquery',
        'backbone',
        'marionette',
        'underscore'],
    function($, Backbone, Marionette, _) {
        var SettingsModel = Backbone.Model.extend({
            urlRoot: 'https://fathomless-crag-87118.herokuapp.com/api/settings'
        });

        return SettingsModel;
    });
