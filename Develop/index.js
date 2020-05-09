
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
    name: "title",
  },
  {
    type: "input",
    message: "Describe the purpose of your project",
    name: "description",
  },
  {
    type: "input",
    message: "What would you like to include in your table of contents?",
    name: "contents",
  },
  {
    type: "input",
    message: "How does installation work?",
    name: "installation",
  },
  {
    type: "input",
    message: "How are issues reported?",
    name: "usage",
  },
  {
    type: "input",
    message: "How are contributions made?",
    name: "contribution",
  },
  {
    type: "input",
    message: "What tests were used?",
    name: "test",
  },
  {
    type: "input",
    message: "Questions to be answered",
    name: "question",
  }
]).then(function(data) {

  //ajax call
  var queryUrl = `https://api.github.com/users/${data.username}`
  axios.get(queryUrl).then(function(response) {
    var thestuff = response
    const userimg = thestuff.avatar_url;
    const useremail = thestuff.email 
    

// writing file

  fs.writeFile('README.md', JSON.stringify(data, null, '\t'), function(err) {

    if (err) {
      return console.log(err);
    }

    fs.appendFile('README.md', userimg, function (err) {
      if (err) throw err;
    });

    fs.appendFile('README.md', useremail, function (err) {
      if (err) throw err;
    });

    console.log("File completed!");
  });
  });
});
