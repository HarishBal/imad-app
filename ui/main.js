console.log('Loaded!');


//Change the text in main-text id

var element=document.getElementById('main-text');

element.innerHTML="New Value";

//Move the image 

var img = document.getElementById('madi');

var margineLeft = 0;

function moveRight()
{
    margineLeft = margineLeft + 10;
    
    img.style.marginLeft = margineLeft + 'px';
}

img.onclick = function(){
    console.log('Clicked!');
    var interval = setInterval(moveRightt, 100);
    //img.style.marginleft = '100px';
    
};

