define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'text!templates/backend/users/details.html'],
    function ($, Backbone, Marionette, _, Handlebars, tpl) {
        var UserDetailsView = Marionette.ItemView.extend({
            initialize: function(opts) {
                if(opts.removeBtn) {
                    this.removeBtn = true;
                } else {
                    this.removeBtn = false;
                }
            },
            ui: {
                "submit": "#submit",
                "username": "[name='username']",
                "password": "[name='password']",
                "role": "[name='role']",
                "email": "[name='email']",
                "input": "input",
                "remove": "#remove"
            },
            events: function() {
                var e = {
                    "click @ui.submit": "save"
                };
                if(this.removeBtn) {
                    e["click @ui.remove"] = "remove";
                }
                console.log(e);
                return e;
            },
            getUIdata: function() {
                return {
                    username: this.ui.username.val(),
                    password: this.ui.password.val(),
                    role: this.ui.role.val(),
                    email: this.ui.email.val()
                }
            },
            save: function() {
                var t = this;
                this.model.save(this.getUIdata(), {
                    success: function(data) {
                        t.triggerMethod("user:saved", data);
                        t.triggerMethod("destroy");
                    }
                });
            },
            remove: function() {
                var t = this;
                this.model.destroy({
                    success: function(data) {
                        t.triggerMethod("user:deleted", data);
                        t.triggerMethod("destroy");
                    }
                })
            },
            templateHelpers: function() {
                return {
                    removeBtn: this.removeBtn
                }
            },
            template: Handlebars.compile(tpl)
        });

        return UserDetailsView;
    });
