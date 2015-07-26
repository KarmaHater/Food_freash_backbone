$(document).ready(function(){

  var RecipeView = Backbone.View.extend({
    template: $("#recipe-tmp").html(),
    events: {
      'click a.check' : 'toggleFavorite',
      'click input.rate' : 'rate'
    },
    render: function() {
      var tmpl = Handlebars.compile(this.template);
      tmpl(this.model.toJSON())
      this.$el.html(tmpl(this.model.toJSON()));
      return this;
    },
    toggleFavorite: function(e) {
      e.preventDefault()
      var target = $(e.target)
      var id = target.attr('id')
      var recipe = RECIPES.get(id)
      if(target.attr('class').includes('like')) {
        recipe.set({'favorite': true})
        target.removeClass('like');
        target.html('Favorite')
      } else {
        recipe.set({'favorite': false})
        target.addClass('check like');
        target.html('unFavorite')
      }
    },
    rate: function(e) {
      var target = $(e.target)
      var id = $(e.target).parent().attr('id')
      var checkboxes = target.siblings().andSelf();
      var numToChk = parseInt(target.attr('name'))
      this.resetRate(checkboxes)
      this.setRate(checkboxes, numToChk, id)
    },
    resetRate: function(checkboxes) {
      checkboxes.prop('checked', false)
    },
    setRate: function(checkboxes, num, id, rate) {
      checkboxes.slice(0, num).prop('checked', true)
      var recipe = RECIPES.get(id)
      recipe.set({rate: num})
    }
  })

  var RecipesView = Backbone.View.extend({
    el: $("#recipesList"),
    initialize: function() {
      RECIPES = new RecipesCollection();
    },
    render: function() {
      var rView = new RecipeView({ model: RECIPES.models[0] })
      this.$el.append(rView.render().el);
    },
    start: function() {
      $.ajax({
        url: '../../recipes.json'
      })
      .success( function(data) {
        this.createRecipes(data);
        this.render();
      }.bind(this))
    },
    createRecipes: function(recipes) {
      for (var i = 0; i < recipes.length; i++) {
        var id = counter;
        var name = recipes[i].name;
        var difficulty = recipes[i].difficulty;
        var rating = recipes[i].rating;
        var image = recipes[i].image;
        var headline = recipes[i].headline;
        var description = recipes[i].description;
        var recipe_id= recipes[i].recipes_id
        var deliverable_ingredients = recipes[i].deliverable_ingredients;
        var ingredients = recipes[i].ingredients;
        var calories = recipes[i].calories;
        var fats = recipes[i].fats;
        var proteins = recipes[i].proteins;
        RECIPES.push(recipes[i])
      }
    }
  })

  var view = new RecipesView;
  view.start();
})
