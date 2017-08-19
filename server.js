var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').Pool;
var config = {
    user:'harishbalakrishna', 
    database: 'harishbalakrishna',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
    };

var app = express();
app.use(morgan('combined'));


function createTemplate(data)
    {
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    var htmlTemplate = `
    <html>
    <head>
        <title> ${title}</title>
        <meta name="viewport" content="width=device-width initial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            <hr/>
            <h4> ${heading}</h4>
            <div>
                ${date.toDateString()}
            </div>
            
            <div>
               ${content}
            </div>
        </div>
    </body>
        
    </html>
    
    `;
    
return htmlTemplate;    
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var counter = 0;
app.get('/counter', function (req, res) {
  counter = counter + 1;
  
  res.send(counter.toString());
});

var pool = new pool(config);
app.get('/test-db', function (req, res) {
  //make a select request
  pool.query('SELECT * from test', function(err, result){
      if(err){
        res.status(500).send(err.toString());
      } else{
        //res.send(JSON.stringify(result));   
        res.send(JSON.stringify(result.rows));
      }
  });
  //return a response with the results
});

var names = [];
/*
// Following is a method to pass a values to the URL and return back as a jason result

app.get('/submit-name/:name', function (req, res) {
  // Get the name from the request
  
  var name = req.params.name;;
  
  names.push(name);
  
  res.send(JSON.stringify(names));
});
*/

// Following is another method using query string
// This will use a foirmat something like url/submit-name?name=xxx
app.get('/submit-name', function (req, res) {
  // Get the name from the request
  
  var name = req.query.name;
  
  names.push(name);
  
  res.send(JSON.stringify(names));
});

/*
app.get('/articles/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});
*/


app.get('/articles/:articleName', function (req, res) {
    console.log('request received');
    
    console.log(req.params.articleName);
  
  //var articleName = req.params.articleName;
  
  /*
  The following way of coding can be used to hack a database
  
  Here we are expecting an article name to show
  
  but an intelegent hacker can pass a malecious code instead of it
  
  for example, 
  instead of passing a genuine url as following,
  http://harishbalakrishna.imad.hasura-app.io/articles/article-three
  one can pass something similar as follows,
  
  http://harishbalakrishna.imad.hasura-app.io/articles/' delete from "article' where 'a' = 'a
  
  here the things you have to notice are following
  
  1. the url is formed as http://harishbalakrishna.imad.hasura-app.io/articles/'
     that means we are expecting an article name and we start it with a ' in our code
     but the hacker himself pass a single code delebratly and our code becomes 
     SELECT * from article where title = ''
    2. the second part begins from here,
     delete from "article' where 'a' = 'a
     in our code we put a closing '
     so the delete query becomes valid
     and the backend database execute the delete command for all rows and deletes all records
     

    but all good libraries provides enough meassurements to prevent such attacks
    
    they are providing parameterised query executions to prevent such situations
    
    the actual code implemented such mechanism
  */
  //pool.query("SELECT * from article where title = '" + req.params.articleName + "'", function(err, result){
  
    pool.query("SELECT * from article where title = $1", [req.params.articleName], function(err, result){
      if(err){
        res.status(500).send(err.toString());
      } else{
            if(result.rows.length ===0){
               res.status(404).send('Article not Found'); 
            } else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
      } 
  });
  
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
