define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'text!templates/destroyWarning.html'],
    function($, Backbone, Marionette, _, Handlebars, tpl) {
        var DestroyWarning = Marionette.Behavior.extend({
            events: {
                "focusout @ui.input": "onFieldOutOfFocus"
            },
            onFieldOutOfFocus: function() {
                if(!this.checkViewOnFocus() && this.checkModelChanged()) {
                    this.saveModel();
                }
            },
            checkModelChanged: function() {
                var attr = this.view.getUIdata();
                for (var key in attr) {
                    if(attr[key] != this.view.model.attributes[key]) {
                        return true;
                    }
                }

                return false;
            },
            checkViewOnFocus: function() {
                var t = this;
                setTimeout(function() {
                    var isFocused = false;
                    t.ui.input.each(function (key, input) {
                        if ($(input).is(":focus")) {
                            isFocused = true;
                        }
                    });

                    return isFocused;
                }, 50);
            },
            updateModel: function () {
                this.view.model.set(this.view.getUIdata());
            },
            saveModel: function() {
                var t = this;
                this.updateModel();

                var newModel = this.view.model.isNew();
                this.view.model.save(null, {
                    success: function() {
                        if(newModel) {
                            t.triggerMethod("new:model:saved");
                        }
                    },
                    error: function(model, response) {
                        console.log(response);
                    }
                });
            },
            onNewModelSaved: function() {
                this.$el.removeAttr("data-new");
            }
        });

        return DestroyWarning;
    });