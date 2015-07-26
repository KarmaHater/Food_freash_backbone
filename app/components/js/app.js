$(document).ready(function(){
  var myApp = new App;
  myApp.start();
})

function App() {}

App.prototype = {
  start: function() {
    $.ajax({
      url: '../../recipes.json'
    })
    .success( function(data) {
      this.recipes = new RecipesCollection();
      this.createRecipe(data)
    }.bind(this))
  },
  createRecipe: function(recipes) {
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
      this.recipes.push(recipes[i])
    }
  }
};

