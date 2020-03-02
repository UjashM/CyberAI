window.onload = function(){

let accordions = document.getElementsByClassName('accordion-header');

let hideshowfunction = function(){  
	if(this.nextElementSibling.style.display != "block")
	{
        for (let i = 0; i < accordions.length; i++) {
            accordions[i].nextElementSibling.style.display = "none";      
        }
        this.nextElementSibling.style.display = "block";
	}
	
else if(this.nextElementSibling.style.display == "block")
	{
         this.nextElementSibling.style.display = "none";
    }
}

for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener('click', hideshowfunction, false);
}
}