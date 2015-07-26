document.addEventListener('DOMContentLoaded', function(){
  myRecipes = new Recipes;
  myRecipes.load();

  var myApp = new App;
  myApp.start();
})

function App() {
  this.form = document.getElementById('signIn');
  this.email = document.getElementById('password');
  this.password = document.getElementById('email');
  this.overlay = document.getElementById('overlay');
}

App.prototype = {
  start: function() {
    this.form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (this.signIn() === true) {
        this.desiplayRecipes();
      } else {
        $('body').append("<h1>Worng Password<h1>");
      }
    }.bind(this), false);
  },
  signIn: function() {
    for (var i = myUsers.users.length - 1; i >= 0; i--) {
      var savedEmail = myUsers.users[i].email;
      if(this.email.value === savedEmail && this.password.value === 'password') return true;
    };
  },
  desiplayRecipes: function() {
    myRecipes.appendRecipes();
    this.overlay.style.display = 'none';
  }
};

