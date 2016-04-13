define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'behaviors/destroyWarning',
        'behaviors/focusoutSave',
        'text!templates/backend/category.html'],
    function ($, Backbone, Marionette, _, Handlebars, destroyWarning, focusoutSave, tpl) {
        var CategoryItemView = Marionette.ItemView.extend({
            ui: {
                "input": "[name='name']",
                name: "[name='name']"
            },
            events: {
            },
            behaviors: {
                DestroyWarning: {
                    behaviorClass: destroyWarning,
                    message: "destroy.category"
                },
                FocusOutSave: {
                    behaviorClass: focusoutSave
                }
            },
            getUIdata: function() {
                return {
                    "name": this.ui.name.val()
                }
            },
            modelEvents: {
                "sync": "onSynced"
            },
            onSynced: function() {
                this.$el.css("background", "green");

                var t = this;
                setTimeout(function() {
                    t.$el.css("background", "inherit");
                }, 300);

                this.render();
            },
            template: Handlebars.compile(tpl)
        });

        return CategoryItemView;
    });