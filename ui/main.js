var button=document.getElementById('counter');


button.onclick = function()
{
// Create a request object

var request = XMLHttpRequest();

// Capture the response and store it in a variable

request.onreadystatechange=function()
    {
    if  (request.readyState ===XMLHttpRequest.DONE)
        {
            //take some action
            
        if  (request.status ===200)
            {
            var counter = request.responseText;
            
            // Render the variable in the correct span
            
            var span=document.getElementById('count');
    
            span.innerHTML = counter.toString();
            }
        }
        // Not done yet
    }
console.log("Clicked");

// Make the request
request.open('GET', 'ttp://harishbalakrishna.imad.hasura-app.io/counter', true);

request.send(null);
};



