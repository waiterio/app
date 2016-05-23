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
            childEvents: {
                'new:category': function(view) {
                    this.addDishes(view.model.get("id"), true);
                    this.initRegion();
                    this.addCategory(view.model.get("id")+1);
                }
            },
            categories: new categoriesCollection(),
            dishesCollection: new dishesCollection(),
            onRender: function() {
                var t = this;

                this.categories.fetch({
                    success: function(collection) {
                        _.each(collection.models, function(category, key) {
                            t.initRegion();
                            t.addCategory(category.id, category);
                            t.addDishes(category.id);
                        });

                        t.initRegion();
                        t.addCategory(t.categoryCount);
                    }
                });

                this.dishesCollection.fetch({
                    success: function(collection) {

                    }
                });
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
            addCategory: function(id, model) {
                if(typeof model === 'undefined') {
                    model = new this.categories.model();
                }
                categoryVw = new categoryItemView({
                    model: model
                });

                this.showChildView('category'+ id, categoryVw);
            },
            addDishes: function(id, launched) {
                options = {
                    collection: this.dishesCollection,
                    category: id
                };

                dishesVw = new dishesView(options);

                /* TODO: Wait with adding item until sync of dishes from origin finished */
                if(!launched) {
                    var add = _.once(dishesVw.addItem);
                    dishesVw.listenTo(this.dishesCollection, "sync", add);
                } else {
                    dishesVw.addItem();
                }

                this.showChildView('dishes'+ id, dishesVw);
            }
        });

        return TableLayout;
    });