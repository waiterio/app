define([
        'jquery',
        'backbone',
        'marionette',
        'underscore'],
    function($, Backbone, Marionette, _) {
        var SettingsModel = Backbone.Model.extend({
            initialize: function(options) {
                this.code = options.code;
            },
            urlRoot: function() {
                return 'settings/lang/' + this.code + '.json';
            }
        });

        return SettingsModel;
    });
