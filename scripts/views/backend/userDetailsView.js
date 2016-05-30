define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'text!templates/backend/users/details.html'],
    function ($, Backbone, Marionette, _, Handlebars, tpl) {
        var UserDetailsView = Marionette.ItemView.extend({
            ui: {
                "submit": "#saveUser",
                "username": "[name='username']",
                "password": "[name='password']",
                "role": "[name='role']",
                "email": "[name='email']",
                "input": "input",
                "remove": "#removeUser"
            },
            events: function() {
                var e = {}
                e["click @ui.submit"] = "saveUser";
                if(this.options.edit) {
                    e["click @ui.remove"] = "removeUser";
                }
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
            saveUser: function() {
                var t = this;
                this.model.save(this.getUIdata(), {
                    success: function(data) {
                        t.triggerMethod("user:saved", data);
                        t.triggerMethod("destroy");
                    }
                });
            },
            removeUser: function() {
                var t = this;
                alert("asdasd");
                this.model.destroy({
                    success: function(data) {
                        t.triggerMethod("user:deleted", data);
                        t.triggerMethod("destroy");
                    }
                })
            },
            templateHelpers: function() {
                return {
                    edit: this.options.edit
                }
            },
            template: Handlebars.compile(tpl)
        });

        return UserDetailsView;
    });
