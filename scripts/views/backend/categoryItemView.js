define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'text!templates/backend/category.html'],
    function ($, Backbone, Marionette, _, Handlebars, tpl) {
        var CategoryItemView = Marionette.ItemView.extend({
            template: Handlebars.compile(tpl)
        });

        return CategoryItemView;
    });