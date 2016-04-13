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
                "focusout @ui.input": "checkIsChanging",
                "click @ui.remove": "removeClicked"
            },
            saved: function() {
                this.ui.input.css("border", "1px solid green");

                var t = this;
                setTimeout(function() {
                    t.ui.input.css("border", "1px solid grey");
                }, 300);

                this.render();
            },
            removeClicked: function() {
                this.askRemove(polyglot.t('delete.category', {name: this.model.get('name')}));
            },
            checkChangedAttributes: function() {
                var attr = {
                    "id": this.model.get("id"),
                    "name": this.ui.input.val()
                };

                for (var key in this.model.attributes) {
                    if (this.model.attributes.hasOwnProperty(key)) {
                        if(attr[key] != this.model.attributes[key]) {
                            return true;
                        }
                    }
                }

                return false;
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