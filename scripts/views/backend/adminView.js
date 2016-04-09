define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars'],
    function ($, Backbone, Marionette, _, Handlebars) {
        var AdminView = Marionette.CollectionView.extend({
            initialize: function(options) {

                this.category = options.category;

                switch (options.type) {
                    case "dishes":
                        this.className = "dishes";
                        break;
                }
            },
            ui: {
                "add": ".add"
            },
            events: {
                "click @ui.add": "addItem"
            },
            childViewOptions: function(model, index) {
                var options = {
                    attributes: {
                        "data-cid": model.cid
                    }
                };

                if(!model.isNew()) {
                    options.attributes["data-id"] = model.get("id");
                } else {
                    options.attributes["data-new"] = "true";
                }
                return options;
            },
            attachHtml: function(collectionView, childView, index){
                if (collectionView.isBuffering) {
                    collectionView._bufferedChildren.splice(index, 0, childView);
                }
                else {
                    if (!collectionView._insertBefore(childView, index)){
                        this.$el.append(childView.el);
                    }
                }
            },
            i: 0,
            addItem: function() {
                this.collection.add(new this.model({categories_id: this.category}));
            },
            tagName: "form"
        });

        return AdminView;
    });
