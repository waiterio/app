define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'text!templates/backend/category.html',
        'views/backend/adminItemView'],
    function ($, Backbone, Marionette, _, Handlebars, tpl, AdminItemView) {
        var CategoryItemView = AdminItemView.extend({
            ui: {
                "remove": ".remove",
                "input": "[name='name']"
            },
            events: {
                "change @ui.input": "inputChanged",
                "paste @ui.input": "inputChanged",
                "keyup @ui.input": "inputChanged",
                "focus @ui.input": "stopAutosave",
                "click @ui.remove": "remove"
            },
            remove: function() {
                this.askRemove(polyglot.t('delete.category', {name: this.model.get('name')}));
            },
            updateModel: function () {
                this.model.set({
                    name: this.ui.input.val()
                });
            },
            template: Handlebars.compile(tpl)
        });

        return CategoryItemView;
    });