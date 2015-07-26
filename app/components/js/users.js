  function Users(users) {
    this.users = users;
  }

  Users.prototype = {
    parse: function(recipes) {
      var parsedUsers = new Array();
      for (var i = recipes.length - 1; i >= 0; i--) {
        parsedUsers.push(recipes[i].user);
      };
    this.users = parsedUsers;
    }
  };

//password for everyone is 'password' because none was given in the json file with usernames.

//sign in is not secure because the code lives in the browers. I'm full stack rails developer so normally I would have a controller that would talk to the server and then redirect. What I have works but is not safe. I would use some server side validations and redirect the page normally.