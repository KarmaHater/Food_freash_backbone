var app = app || {};
app.RecipeViewMain = Backbone.View.extend({
  // template: $("#recipe-tmpl-main").html(),
  events: {
    'click a.check' : 'toggleFavorite',
    'click input.rate' : 'rate',
  },
  render: function() {
    this.template = $("#recipe-tmpl-main").html()
    var tmpl = Handlebars.compile(this.template);
    this.$el.html(tmpl(this.model.toJSON()));
    return this
  },
  toggleFavorite: function(e) {
    e.preventDefault()
    var target = $(e.target)
    var id = target.attr('id')
    var recipe = $(window).width() > 720 ? MAIN_RECIPE : app.Recipes.get(id)
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
    this.model.set({rate: numToChk})
  },
  resetRate: function(checkboxes) {
    checkboxes.prop('checked', false)
  },
  setRate: function(checkboxes, num, id, rate) {
    checkboxes.slice(0, num).prop('checked', true)
    var recipe = $(window).width() > 720 ? MAIN_RECIPE : app.Recipes.get(id)
    recipe.set({rate: num})
  }
})