define([
        'jquery',
        'backbone',
        'marionette',
        'underscore'],
    function($, Backbone, Marionette, _) {
        var UserModel = Backbone.Model.extend({
            url: window.settings.tech.apiurl + '/users'
        });

        return UserModel;
    });