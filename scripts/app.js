define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'handlebars'
    ],
    function ($, _, Backbone, Marionette, Handlebars) {
        Handlebars.registerHelper('times', function(times, opts) {
            var out = "";
            var i;
            var data = {};

            if ( times ) {
                for ( i = 0; i < times; i += 1 ) {
                    data.index = i;
                    out += opts.fn(this, {
                        data: data
                    });
                }
            } else {

                out = opts.inverse(this);
            }

            return out;
        });

        Backbone.Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
            return Handlebars.compile(rawTemplate);
        };

        var App = new Backbone.Marionette.Application();

        App.addRegions({
            main: '#main'
        });

        App.addInitializer(function() {
        });

        App.on("start", function(){
            Backbone.history.start({ root: "/"});
        });

        App.vent.on("setTitle", function(title) {
            $("#pageTitle").html(title);
        });

        return App;

    });
