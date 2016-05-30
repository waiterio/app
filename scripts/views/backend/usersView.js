define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'collections/users',
        'text!templates/backend/users/overview.html'],
    function ($, Backbone, Marionette, _, Handlebars, usersCollection, tpl) {
        var UsersView = Marionette.ItemView.extend({
            initialize: function() {
                this.collection.fetch();
            },
            collectionEvents: {
                "sync": "render",
                "add": "render",
                "remove": "render"
            },
            ui: {
                "add": ".add",
                "edit": ".edit"
            },
            events: {
                "click @ui.add": "addUser",
                "click @ui.edit": "editUser"
            },
            addUser: function() {
                var model = this.collection.model;
                var t = this;

                require([
                    'regions/modal',
                    'views/backend/userDetailsView'
                ], function(modalRegion, userDetailsView) {
                    UsersView.modal = new modalRegion();
                    var UserDetailsView = new userDetailsView({model: new model()});
                    UsersView.modal.show(UserDetailsView);
                    UserDetailsView.on("user:saved", function(data) {
                        t.collection.add(data.attributes);
                    });
                });
            },
            editUser: function(e) {
                e.preventDefault();
                var id = $(e.currentTarget).parent(".tableRow").data("id");
                var model = this.collection.get(id);
                var t = this;

                require([
                    'regions/modal',
                    'views/backend/userDetailsView'
                ], function(modalRegion, userDetailsView) {
                    modal = new modalRegion();
                    var UserDetailsView = new userDetailsView({model: model, edit: true});
                    modal.show(UserDetailsView);
                    UserDetailsView.on("user:deleted", function(data) {
                        t.collection.remove(data.get("id"));
                    });
                });

            },
            collection: new usersCollection(),
            template: Handlebars.compile(tpl),
            templateHelpers: function() {
                return {
                    "add": polyglot.t("add"),
                    "edit": polyglot.t("edit")
                }
            }
        });

        return UsersView;
    });
