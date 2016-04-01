define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'text!templates/select.html'],
    function ($, Backbone, Marionette, _, Handlebars, tpl) {
        var SelectView = Marionette.ItemView.extend({
            template: Handlebars.compile(tpl)
        });

        return SelectView;
    });