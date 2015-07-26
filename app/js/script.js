var counter=0,Recipe=Backbone.Model.extend({initialize:function(){counter++},defaults:function(){return{id:"",name:"",difficulty:"",rating:"",image:"",headline:"",description:"",recipe_id:"",deliverable_ingredients:"",ingredients:"",calories:"",fats:"",proteins:"",favorite:!1}}}),RecipesCollection=Backbone.Collection.extend({model:Recipe});$(document).ready(function(){var a=Backbone.View.extend({template_main:$("#recipe-tmpl-main").html(),template_small:$("#recipe-tmpl-main").html(),events:{"click a.check":"toggleFavorite","click input.rate":"rate"},render:function(){for(var a=0;a<RECIPES.length;a++){var b=Handlebars.compile(this.template_main);return b(RECIPES.models[a].toJSON()),this.$el.html(b(this.model.toJSON())),this}},renderMainRecipe:function(){var a=Handlebars.compile(this.template_main);return a(this.model.toJSON()),this.$el.html(a(this.model.toJSON())),this},renderSmallRecipes:function(){var a=Handlebars.compile(this.template_small);return a(this.model.toJSON()),this.$el.html(a(this.model.toJSON())),this},toggleFavorite:function(a){a.preventDefault();var b=$(a.target),c=b.attr("id"),d=RECIPES.get(c);b.attr("class").includes("like")?(d.set({favorite:!0}),b.removeClass("like"),b.html("Favorite")):(d.set({favorite:!1}),b.addClass("check like"),b.html("unFavorite"))},rate:function(a){var b=$(a.target),c=$(a.target).parent().attr("id"),d=b.siblings().andSelf(),e=parseInt(b.attr("name"));this.resetRate(d),this.setRate(d,e,c)},resetRate:function(a){a.prop("checked",!1)},setRate:function(a,b,c,d){a.slice(0,b).prop("checked",!0);var e=RECIPES.get(c);e.set({rate:b})}}),b=Backbone.View.extend({el:$("#recipesList"),initialize:function(){RECIPES=new RecipesCollection},render:function(b){var c=$(window).width<720;if(c){var d=b||RECIPES.models[0],e=new a({model:d});this.$el.append(e.renderMainRecipe().el)}else{var d=RECIPES.models,e=new a({model:d});this.$el.append(e.render().el)}},start:function(){$.ajax({url:"../../recipes.json"}).success(function(a){this.createRecipes(a),this.render()}.bind(this))},createRecipes:function(a){for(var b=0;b<a.length;b++){a[b].name,a[b].difficulty,a[b].rating,a[b].image,a[b].headline,a[b].description,a[b].recipes_id,a[b].deliverable_ingredients,a[b].ingredients,a[b].calories,a[b].fats,a[b].proteins;RECIPES.push(a[b])}}}),c=new b;c.start()});