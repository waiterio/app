define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars',
        'collections/categories',
        'collections/dishes',
        'views/table/categoryItemView',
        'views/table/dishesView',
        'views/table/orderView',
        'text!templates/table/orderLayout.html',
        'text!templates/table/categoryLayout.html'],
    function ($, Backbone, Marionette, _, Handlebars, categoriesCollection, dishesCollection, categoryItemView, dishesView, orderView, tpl, categoryTpl) {
        var OrderLayout = Marionette.LayoutView.extend({
            template: Handlebars.compile(tpl),
            tagName: "main",
            regions: {
                content: "#content",
                sidebar: "#sidebar"
            },
            childEvents: {
                "dish:add:order": "onDishAddOrder",
                "form:submit:order": "onShowConfirmation"
            },
            onDishAddOrder: function(childview, model) {
                this.order.triggerMethod("new:order:item", model.toJSON());
            },
            onShowConfirmation: function(childview, orderitems) {
                var t = this;

                require(["views/table/orderConfirmationView"],
                    function (ConfirmationView) {
                        t.addRegion("confirmation", "#confirmation");
                        t.showChildView("confirmation", new ConfirmationView({
                            orderitems: orderitems
                        }));
                    });
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

                            dishesVw = new dishesView({
                                filter: function (child, index, collection) {
                                    return child.get('categories_id') == category.id;
                                }, collection: t.dishesCollection
                            });

                            categoryVw = new categoryItemView({
                                model: category
                            });

                            t.showChildView('category'+ category.id, categoryVw);
                            t.showChildView('dishes'+ category.id, dishesVw);
                        });
                    }
                });

                this.dishesCollection.fetch();

                this.order = new orderView();
                this.order.render();

                this.showChildView('sidebar', this.order);

            }
        });

        return OrderLayout;
    });