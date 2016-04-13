define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars'],
    function ($, Backbone, Marionette, _, Handlebars) {
        var AdminItemView = Marionette.ItemView.extend({
            askRemove: function(msg) {
                var r = confirm(msg);
                if (r == true) {
                    this.removeIt();
                }
            },
            checkIsChanging: function() {
                var t = this;
                setTimeout(function() {
                    var isChanging = false;

                    t.ui.input.each(function (key, input) {
                        if ($(input).is(":focus")) {
                            isChanging = true;
                        }
                    });

                    if (isChanging === false && t.checkChangedAttributes()) {
                        t.prepareSave();
                    }
                }, 50);
            },
            prepareSave: function() {
                var t = this;
                this.updateModel();
                t.model.save(null, {
                    success: function() {
                        t.saved();
                    },
                    error: function(model, response) {
                        console.log(response);
                    }
                });
            },
            removeIt: function() {
                var t = this;
                this.model.destroy(null, {
                    success: function() {
                        t.destroy();
                    },
                    error: function(model, response) {
                        console.log(response);
                    }
                });
            }
        });

        return AdminItemView;
    });