$(document).ready(function(){

  var RecipeViewMain = Backbone.View.extend({
    template: $("#recipe-tmpl-main").html(),
    events: {
      'click a.check' : 'toggleFavorite',
      'click input.rate' : 'rate',
    },
    render: function() {
      var tmpl = Handlebars.compile(this.template);
      this.$el.html(tmpl(this.model.toJSON()));
      return this
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

  var RecipeViewSmall = Backbone.View.extend({
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
      var newMainImage = RECIPES.get($(e.target).parent().attr('id'))
      RECIPES.add(MAIN_RECIPE)
      MAIN_RECIPE = newMainImage
      APP.render(MAIN_RECIPE)
    }
  })

  var RecipesView = Backbone.View.extend({
    el: $("#recipesList"),
    initialize: function() {
      // $(window).on("resize", this.checkFormat.bind(this));
      RECIPES = new RecipesCollection();
    },
    render: function(recipe) {
      if($(window).width() > 720) {
        MAIN_RECIPE = recipe || RECIPES.models[0]
        this.desktopDisplay(recipe)
      } else {
        this.mobileDisplay();
      }
    },
    desktopDisplay: function() {
      $('#recipesList').html('')
      $('#sideList').html('')
      var mainView = new RecipeViewMain({ model: MAIN_RECIPE })
      this.$el.append(mainView.render().el);
      for (var i = 0; i < RECIPES.length; i++) {
        RECIPES.remove(MAIN_RECIPE)
        var smallView = new RecipeViewSmall({ model: RECIPES.models[i] })
        $("#sideList").append(smallView.render().el);
      };
    },
    mobileDisplay: function() {
      for (var i = 0; i < RECIPES.models.length; i++) {
        var mainView = new RecipeViewMain({ model: RECIPES.models[i] })
        this.$el.append(mainView.render().el);
      };
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

  APP = new RecipesView;
  APP.start();
})
