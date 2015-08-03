var app = app || {};
app.counter = 0
app.Recipe = Backbone.Model.extend({
  initialize: function() {
    app.counter++
  },  
  defaults: function() {
    return {
      favorite: false,
      rate: 0
    }
  }
})