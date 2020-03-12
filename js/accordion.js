window.onload = function(){
//getting accordion-headers to add click event
let accordions = document.getElementsByClassName('accordion-header');

let hideshowfunction = function(){  
    //logic for checking display of content
	if(this.nextElementSibling.style.display != "block")
	{
        //if content is invisible, set other open content's display to none
        for (let i = 0; i < accordions.length; i++) {
            accordions[i].nextElementSibling.style.display = "none";      
        }
        //setting current content display to block to show content
        this.nextElementSibling.style.display = "block";
    }
    
	//If content is not hidden, changing the display property to none to hide content
else if(this.nextElementSibling.style.display == "block")
	{
         this.nextElementSibling.style.display = "none";
    }
}
//Adding click event to every accordion-headers
for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener('click', hideshowfunction, false);
}
}