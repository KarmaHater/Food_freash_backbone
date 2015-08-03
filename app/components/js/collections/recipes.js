var app = app || {};
var RecipesCollection = Backbone.Collection.extend({
  model: app.Recipe
})

app.Recipes = new RecipesCollection();