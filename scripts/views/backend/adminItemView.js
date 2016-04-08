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
                    this.destroy();
                }
            },
            inputChanged: function() {
                var cid = this.model.get("cid");
                this.stopAutosave(cid);
                this.updateModel();
                this.autosave(cid);
            },
            autosaves: {},
            autosave: function(cid) {
                var t = this;
                var autosave = setTimeout(function() {
                    console.log(t.model.toJSON());
                    t.model.save(t.model.toJSON(), {
                        success: function() {
                            t.saved();
                        },
                        error: function(model, response) {
                            alert("cannot submit changes");
                            console.log(response);
                        }
                    });
                }, 3000);

                this.autosaves[cid] = autosave;
            },
            saved: function() {
                this.$el.css("background", "green");

                var t = this;
                setTimeout(function() {
                    t.$el.css("background", "inherit");
                }, 300);

                this.render();
            },
            stopAutosave: function(cid) {
                if(typeof this.autosaves[cid] !== 'undefined') {
                    clearTimeout(this.autosaves[cid]);
                    delete this.autosaves.cid;
                }
            },
            destroy: function() {
                this.model.destroy();
            }
        });

        return AdminItemView;
    });