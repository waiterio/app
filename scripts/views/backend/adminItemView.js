define([
        'jquery',
        'backbone',
        'marionette',
        'underscore',
        'handlebars'],
    function ($, Backbone, Marionette, _, Handlebars) {
        var AdminItemView = Marionette.ItemView.extend({
            initialize: function(options) {
                this.template = Handlebars.compile(options.tpl);
            },
            askRemove: function() {
                this.destroy();
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
                    t.model.save(t.model.toJSON(), {
                        dataType: 'html',
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
            },
            stopAutosave: function(cid) {
                if(typeof this.autosaves[cid] !== 'undefined') {
                    clearTimeout(this.autosaves[cid]);
                    delete this.autosaves.cid;
                }
            },
            reverseCalc: function(price) {
                return parseInt(price.replace(",",""));
            },
            calc: function(amount) {
				if(amount < 100) {
                    if(amount <= 9) {
                        if (amount == 0) {
                            return "0,00";
                        } else {
                            return "0,0" + amount;
                        }
                    } else {
                        return "0," + amount;
                    }
				}
				var str = amount.toString();
				str = [str.slice(0, str.length - 2), ",", str.slice(str.length - 2, str.length)].join('');
				return str;
			},
            onDestroy: function() {
                this.model.destroy();
            },
            templateHelpers: function() {
                return {price: this.calc(this.model.get("price"))};
            }
        });

        return AdminItemView;
    });