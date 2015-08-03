var app = app || {};

app.RecipeViewSmall = Backbone.View.extend({
  template: $("#recipe-tmpl-small").html(),
  tagName: 'li',
  className: 'sml-recipe-box',
  events: {
    'click figure.small-image' : 'resetRecipe'
  },
  render: function() {
    var tmpl = Handlebars.compile(this.template);
    tmpl(this.model.toJSON())
    this.$el.html(tmpl(this.model.toJSON()));
      return this;
  },
  resetRecipe: function(e) {
    var newMainImage = app.Recipes.get($(e.target).parent().attr('id'))
    app.Recipes.add(MAIN_RECIPE)
    MAIN_RECIPE = newMainImage
    APP.render(MAIN_RECIPE)
  }
})