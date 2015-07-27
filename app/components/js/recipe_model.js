var counter = 0
var Recipe = Backbone.Model.extend({
  initialize: function() {
    counter++
  },  
  defaults: function() {
    return {
      favorite: false,
      rate: 0
    }
  }
})