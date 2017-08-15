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

var articles={
    'article-one':{
    	title:"Article One", 
    	heading:"Article One",
    	date:"8 Aug 2017", 
    	content:`
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id nibh a mauris hendrerit tristique id quis libero. Vestibulum nec dolor sed arcu pretium molestie vel et tellus. Donec efficitur lorem quis tempus fringilla. Cras volutpat, tellus id malesuada ultrices, nisl neque feugiat urna, at accumsan dui eros id nisl. Nulla eleifend tortor in dolor lacinia, id aliquet odio eleifend. Sed aliquet feugiat dolor ut bibendum. Mauris sed nisl eu eros tristique tempor. Vivamus lacinia mi nunc, nec vulputate turpis maximus eu. Curabitur viverra lacus nec pellentesque tempor. Maecenas sed metus eget turpis facilisis congue a vitae justo. Integer vehicula suscipit convallis. Quisque fringilla aliquet velit. Nam bibendum vitae orci at elementum.
                </p>
                
                <p>
                    Proin vel dictum leo. Donec maximus lacus lectus, ut malesuada lorem maximus quis. Vestibulum in elementum tellus. Morbi interdum venenatis convallis. Mauris a ipsum elit. Integer rhoncus cursus ligula, id egestas augue sollicitudin vitae. Proin dui lectus, aliquam nec tortor eu, fringilla tempus lacus. Sed vitae mauris maximus, dignissim metus a, bibendum erat. Donec dictum nisi non hendrerit ullamcorper. Vestibulum facilisis nulla id lacus laoreet fermentum. Fusce maximus diam et mauris euismod molestie. Quisque vulputate nunc in tincidunt iaculis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur maximus orci mi, et auctor dui varius nec.
                </p>
                <p>
                    Duis consectetur ligula velit, id rhoncus lacus convallis ut. Vivamus sed molestie nunc. Sed ut neque sollicitudin, ullamcorper magna eu, sollicitudin nunc. Donec non cursus urna, et varius nunc. Maecenas mi nunc, faucibus quis nisl non, hendrerit ornare lacus. Duis sit amet fringilla est. Nam nisl augue, interdum eget egestas at, vulputate eu leo. Aenean scelerisque tincidunt rutrum. Vivamus vitae nisl non nunc laoreet molestie vel vitae neque. Fusce vel ipsum ligula.
                </p>
                <p>
                    Sed dapibus egestas libero, blandit convallis purus vulputate at. Duis consectetur ante eu purus vulputate sollicitudin. Donec fringilla orci purus. Aliquam egestas mi nec purus facilisis, dictum ultricies orci pellentesque. Fusce mi eros, mattis quis rhoncus vel, facilisis vitae diam. Etiam sed lectus a odio lobortis interdum. Vivamus magna justo, facilisis id tellus at, fermentum vestibulum quam. Nunc viverra, libero eu convallis hendrerit, velit lorem porta sapien, ut eleifend quam arcu non turpis. Fusce elementum porta diam, at fringilla quam pretium viverra. Donec feugiat aliquet fringilla. Fusce fringilla tempor tincidunt.
                </p>
                <p>
                    Maecenas sit amet ligula porttitor, vehicula justo sed, interdum tellus. Curabitur vel est elit. Suspendisse ullamcorper, velit at fermentum euismod, sapien mi interdum nunc, sit amet vulputate elit mi sed massa. Donec tincidunt lectus non erat vehicula, eu venenatis purus accumsan. Curabitur aliquet commodo velit sed ultricies. Etiam gravida suscipit nunc sit amet faucibus. Ut finibus massa eget orci ultrices, ac convallis elit facilisis. Nam tincidunt ipsum et egestas venenatis. Proin enim nibh, ultricies nec porta gravida, egestas in mi. Aenean et felis massa.
                </p>`
        },
    'article-two':{
	title:"Article Two", 
	heading:"Article Two",
	date:"10 Aug 2017", 
	content:`
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id nibh a mauris hendrerit tristique id quis libero. Vestibulum nec dolor sed arcu pretium molestie vel et tellus. Donec efficitur lorem quis tempus fringilla. Cras volutpat, tellus id malesuada ultrices, nisl neque feugiat urna, at accumsan dui eros id nisl. Nulla eleifend tortor in dolor lacinia, id aliquet odio eleifend. Sed aliquet feugiat dolor ut bibendum. Mauris sed nisl eu eros tristique tempor. Vivamus lacinia mi nunc, nec vulputate turpis maximus eu. Curabitur viverra lacus nec pellentesque tempor. Maecenas sed metus eget turpis facilisis congue a vitae justo. Integer vehicula suscipit convallis. Quisque fringilla aliquet velit. Nam bibendum vitae orci at elementum.
            </p>
            
              <p>
                Maecenas sit amet ligula porttitor, vehicula justo sed, interdum tellus. Curabitur vel est elit. Suspendisse ullamcorper, velit at fermentum euismod, sapien mi interdum nunc, sit amet vulputate elit mi sed massa. Donec tincidunt lectus non erat vehicula, eu venenatis purus accumsan. Curabitur aliquet commodo velit sed ultricies. Etiam gravida suscipit nunc sit amet faucibus. Ut finibus massa eget orci ultrices, ac convallis elit facilisis. Nam tincidunt ipsum et egestas venenatis. Proin enim nibh, ultricies nec porta gravida, egestas in mi. Aenean et felis massa.
            </p>`
},
    'article-three':{
	title:"Article Three", 
	heading:"Article Three",
	date:"10 Aug 2017", 
	content:`
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id nibh a mauris hendrerit tristique id quis libero. Vestibulum nec dolor sed arcu pretium molestie vel et tellus. Donec efficitur lorem quis tempus fringilla. Cras volutpat, tellus id malesuada ultrices, nisl neque feugiat urna, at accumsan dui eros id nisl. Nulla eleifend tortor in dolor lacinia, id aliquet odio eleifend. Sed aliquet feugiat dolor ut bibendum. Mauris sed nisl eu eros tristique tempor. Vivamus lacinia mi nunc, nec vulputate turpis maximus eu. Curabitur viverra lacus nec pellentesque tempor. Maecenas sed metus eget turpis facilisis congue a vitae justo. Integer vehicula suscipit convallis. Quisque fringilla aliquet velit. Nam bibendum vitae orci at elementum.
            </p>
            
            <p>
                Proin vel dictum leo. Donec maximus lacus lectus, ut malesuada lorem maximus quis. Vestibulum in elementum tellus. Morbi interdum venenatis convallis. Mauris a ipsum elit. Integer rhoncus cursus ligula, id egestas augue sollicitudin vitae. Proin dui lectus, aliquam nec tortor eu, fringilla tempus lacus. Sed vitae mauris maximus, dignissim metus a, bibendum erat. Donec dictum nisi non hendrerit ullamcorper. Vestibulum facilisis nulla id lacus laoreet fermentum. Fusce maximus diam et mauris euismod molestie. Quisque vulputate nunc in tincidunt iaculis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur maximus orci mi, et auctor dui varius nec.
            </p>
            <p>
                Duis consectetur ligula velit, id rhoncus lacus convallis ut. Vivamus sed molestie nunc. Sed ut neque sollicitudin, ullamcorper magna eu, sollicitudin nunc. Donec non cursus urna, et varius nunc. Maecenas mi nunc, faucibus quis nisl non, hendrerit ornare lacus. Duis sit amet fringilla est. Nam nisl augue, interdum eget egestas at, vulputate eu leo. Aenean scelerisque tincidunt rutrum. Vivamus vitae nisl non nunc laoreet molestie vel vitae neque. Fusce vel ipsum ligula.
            </p>`
    }
};
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
                ${date}
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
        res.send(JASON.stringify(result));   
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

app.get('/ui/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
