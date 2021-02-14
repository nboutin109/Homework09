
var inquirer = require("inquirer");
var fs = require('fs');
var axios = require("axios");

//inquirer prompts

inquirer.prompt([
  {
    type: "input",
    name: "username",
    message: "What is your github username?"
  },
  {
    type: "input",
    message: "What is the title of your project?",
    name: "Title",
  },
  {
    type: "input",
    message: "Describe the purpose of your project",
    name: "Description",
  },
  {
    type: "input",
    message: "How is it used?",
    name: "Usage",
  },
  {
    type: "input",
    message: "Anything else to add?",
    name: "Details",
  }
]).then(function(data) {

  //ajax call
  var queryUrl = `https://api.github.com/users/${data.username}`
  axios.get(queryUrl).then(function(response) {
    var thestuff = response;
    const userimg = thestuff.avatar_url;
    const useremail = thestuff.email 
    

// writing file

  fs.writeFile('README2.md', JSON.stringify(data, null, '\t'), function(err) {

    if (err) {
      return console.log(err);
    }

    fs.appendFile('README2.md', userimg, function (err) {
      if (err) throw err;
    });

    fs.appendFile('README2.md', useremail, function (err) {
      if (err) throw err;
    });

    console.log("File completed!");
  });
  });
});
