define([
        'jquery',
        'backbone',
        'marionette',
        'underscore'],
    function($, Backbone, Marionette, _) {
        var SettingsModel = Backbone.Model.extend({
            url: 'settings/settings.json'
        });

        return SettingsModel;
    });
