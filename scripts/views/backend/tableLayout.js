define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'models/category',
        'collections/categories',
        'models/dish',
        'collections/dishes',
        'views/backend/adminView',
        'views/backend/categoryItemView',
        'views/backend/dishesItemView',
        'text!templates/table/orderLayout.html',
        'text!templates/backend/categoryLayout.html'],
    function ($, Backbone, Marionette, _, Handlebars, categoryModel, categoriesCollection, dishModel, dishesCollection, adminView, categoryItemView, dishesItemView, tpl, categoryTpl) {
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

                template = Handlebars.compile(categoryTpl);

                this.categories.fetch({
                    success: function(collection) {
                        _.each(collection.models, function(category, key) {
                            html = template({name: category.get("name"), id: category.id});

                            t.$el.children("#content").append(html);
                            t.addRegion('category'+ category.id, ".categories[data-id='"+ category.id +"'] .category");
                            t.addRegion('dishes'+ category.id, ".categories[data-id='"+ category.id +"'] .dishes");

                            options = {
                                collection: t.dishesCollection,
                                childView: dishesItemView,
                                type: "dishes",
                                model: dishModel,
                                category: category.id,
                                filter: function (child, index, collection) {
                                    return child.get('categories_id') == category.id;
                                }
                            };

                            dishesVw = new adminView(options);

                            categoryVw = new categoryItemView({
                                model: category
                            });

                            t.showChildView('category'+ category.id, categoryVw);
                            t.showChildView('dishes'+ category.id, dishesVw);
                        });
                    }
                });

                this.dishesCollection.fetch();

            }
        });

        return TableLayout;
    });