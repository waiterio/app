define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars'],
    function ($, Backbone, Marionette, _, Handlebars) {
        var ModalRegion = Marionette.Region.extend({
            el: "#modal",
            attachHtml: function(view){
                this.$el.empty().append("<div class=\"modal-bg\"></div><div class=\"modal\"></div>");
                this.$el.children(".modal").append(view.el);
                this.$el.hide().fadeIn(100);
            },
            onShow: function() {
                var view = this;
                $(".modal-bg").click(function() {
                    view.$el.fadeOut(100);
                });
            },
            onBeforeEmpty: function() {
                this.$el.fadeOut(100);
            }
        });
        return ModalRegion;
    });
