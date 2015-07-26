$(document).ready(function() {
  var RecipeView = Backbone.View.extend({
    template: $("#recipe-tmp").html(),
    render: function() {
      var tmpl = _.template(this.template);
      this.$el.html(tmp(this.model.toJSON()));
    }
  })

  var RecipesView = Backbone.View.extend({
    el: $("#recipesList"),
    initialize: function() {
      // this.collection: new RecipesCollection(recipes);
    },
    render: function() {
      
    }
  })
})