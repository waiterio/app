define([
        'jquery',
        'backbone',
        'marionette',
        'underscore'],
    function($, Backbone, Marionette, _) {
        var UserModel = Backbone.Model.extend({
            urlRoot: window.settings.tech.apiurl + '/users'
        });

        return UserModel;
    });