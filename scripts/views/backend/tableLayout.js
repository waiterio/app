define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'collections/categories',
        'collections/dishes',
        'views/backend/dishesView',
        'views/backend/categoryItemView',
        'text!templates/table/orderLayout.html',
        'text!templates/backend/categoryLayout.html'],
    function ($, Backbone, Marionette, _, Handlebars, categoriesCollection, dishesCollection, dishesView, categoryItemView, tpl, categoryTpl) {
        var TableLayout = Marionette.LayoutView.extend({
            template: Handlebars.compile(tpl),
            tagName: "main",
            regions: {
                content: "#content",
                sidebar: "#sidebar"
            },
            onRender: function() {
                this.categories = new categoriesCollection();
                var t = this;
                this.dishesCollection = new dishesCollection();

                this.categories.fetch({
                    success: function(collection) {
                        _.each(collection.models, function(category, key) {
                            t.initRegion();
                            t.addCategory(category);
                            t.addDishes(category);
                        });

                        t.initRegion();
                        t.addCategory(new t.categories.model());
                    }
                });

                this.dishesCollection.fetch();
            },
            categoryCount: 0,
            initRegion: function() {
                this.categoryCount++;

                template = Handlebars.compile(categoryTpl);
                html = template({id: this.categoryCount});

                this.addRegion('category'+ this.categoryCount, ".categories[data-id='"+ this.categoryCount +"'] .category");
                this.addRegion('dishes'+ this.categoryCount, ".categories[data-id='"+ this.categoryCount +"'] .dishes");

                this.$el.children("#content").append(html);
            },
            addCategory: function(category) {
                categoryVw = new categoryItemView({
                    model: category
                });

                this.showChildView('category'+ this.categoryCount, categoryVw);
            },
            addDishes: function(category) {
                options = {
                    collection: this.dishesCollection,
                    category: category.id
                };

                dishesVw = new dishesView(options);

                this.showChildView('dishes'+ this.categoryCount, dishesVw);
            }
        });

        return TableLayout;
    });