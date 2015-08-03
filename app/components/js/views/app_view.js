var app = app || {};
app.AppView = Backbone.View.extend({
  el: $("#recipesList"),
  initialize: function() {
    // $(window).on("resize", this.checkFormat.bind(this));
  },
  render: function(recipe) {
    if($(window).width() > 720) {
      MAIN_RECIPE = recipe || app.Recipes.models[0]
      this.desktopDisplay(recipe)
    } else {
      this.mobileDisplay();
    }
  },
  desktopDisplay: function() {
    $('#recipesList').html('')
    $('#sideList').html('')
    var mainView = new app.RecipeViewMain({ model: MAIN_RECIPE })
    this.$el.append(mainView.render().el);
    app.Recipes.remove(MAIN_RECIPE)
    app.Recipes.each(function(recipe) {
      var smallView = new app.RecipeViewSmall({ model: recipe })
      $("#sideList").append(smallView.render().el);
    })
  },
  mobileDisplay: function() {
    app.Recipes.each(function(recipe) {
      var mainView = new app.RecipeViewMain({ model: recipe })
      $("#recipesList").append(mainView.render().el);
    })
  },
  start: function() {
    $.ajax({
      url: 'recipes.json'
    })
    .success(function(data) {
      this.createRecipes(data);
    }.bind(this));
  },
  createRecipes: function(recipes) {
    _.each(recipes, function(recipe) {
      new_recipe = new app.Recipe({model: recipe})
      app.Recipes.add(recipe)
    })
    this.render();
  }
  // ,
  // checkFormat: function(recipe) {
  //   if($(window).width() > 720) {
  //     var mainRecipe = recipe || RECIPES.models[0]
  //     var rView = new RecipeView({ model: mainRecipe })
  //     this.$el.append(rView.renderMainRecipe().el);
  //   } else {
  //     for (var i = 0; i < RECIPES.models.length; i++) {
  //       var rView = new RecipeView({ model: RECIPES.models[i] })
  //       this.$el.append(rView.render().el);
  //     };
  //   }
  // }
})