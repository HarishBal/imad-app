var button=document.getElementById('counter');


var counter = 0;

button.onclick = function()
{
    // Make a request to the counter end point
    
    // Capture the response and store it in a variable
    
    // Render the variable in the correct span
    
    console.log("Clicked");
    
    counter = counter + 1;
    
    var span=document.getElementById('count');
    
    span.innerHTML = counter.ToString();
};