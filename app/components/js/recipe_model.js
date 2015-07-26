var counter = 0
var Recipe = Backbone.Model.extend({
  initialize: function() {
    counter++
  },  
  defaults: function() {
    return {
      id: '',
      name: '',
      difficulty: '',
      rating: '',
      image: '',
      headline: '',
      description: '',
      recipe_id: '',
      deliverable_ingredients: '',
      ingredients: '',
      calories: '',
      fats: '',
      proteins: '',
      rate: '',
      favorite: ''
    }
  }
})