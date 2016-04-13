define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'text!templates/destroyWarning.html'],
    function($, Backbone, Marionette, _, Handlebars, tpl) {
        var DestroyWarning = Marionette.Behavior.extend({
            defaults: {
                "message": "destroy.default"
            },
            events: {
                "click @ui.destroy": "warnBeforeDestroy"
            },
            ui: {
                "destroy": ".destroy"
            },
            warnBeforeDestroy: function () {
                template = Handlebars.compile(tpl);
                html = template({message: polyglot.t(this.options.message)});
                $("body").append(html);

                var t = this;
                $(".okay").click(function() {
                    t.view.destroy();
                    $("#destroyWarning").remove();
                });
                $(".not").click(function() {
                    $("#destroyWarning").remove();
                });
            }
        });

        return DestroyWarning;
    });