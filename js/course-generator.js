let requestURL = "data/courses.json";
let request = new XMLHttpRequest();
let maincontentContainer = document.getElementsByClassName('main-content')[0];
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
const courses = request.response;  
console.log(courses);
    
if(false || !!document.documentMode)
{
    let coursearray = JSON.parse(courses);
    for(let i = 0; i < coursearray.length; i++)
    {
            //code for IE
            let courseContainerElement = document.createElement("div");
            courseContainerElement.classList.add('course-container');
            courseContainerElement.classList.add('search-container');
            let courseCodeElement = document.createElement("span");
            courseCodeElement.appendChild(document.createTextNode(coursearray[i].courseCode));
            courseCodeElement.appendChild(document.createTextNode(' '));
            courseCodeElement.appendChild(document.createTextNode(coursearray[i].title));
            courseCodeElement.appendChild(document.createTextNode(' '));
            courseCodeElement.appendChild(document.createTextNode(coursearray[i].courseCredits));
            courseContainerElement.appendChild(courseCodeElement); 
            courseContainerElement.appendChild(document.createElement("br"));
            departmentElement = document.createElement("span");
            departmentElement.appendChild(document.createTextNode('Department: '));
            departmentElement.appendChild(document.createTextNode(coursearray[i].department));
            courseContainerElement.appendChild(departmentElement);
            courseContainerElement.appendChild(document.createElement("br"));
            degreeElement = document.createElement("span");
            degreeElement.appendChild(document.createTextNode('Degree: '));
            degreeElement.appendChild(document.createTextNode(coursearray[i].degree));
            courseContainerElement.appendChild(degreeElement);
            courseContainerElement.appendChild(document.createElement("br"));
            descriptionElement = document.createElement("p");
            descriptionElement = document.createTextNode(coursearray[i].description);
            courseContainerElement.appendChild(descriptionElement);
            maincontentContainer.appendChild(courseContainerElement);
    }           
}

        else
        {   
            //y = [...new Set(courses.map(course => course.degree))];
            for(let i = 0; i < courses.length; i++)
            {    
            let coursetemplate =    
                    '<strong><span class = "course-code">' + courses[i].courseCode + '</span> &nbsp; &nbsp;<span class = "course-title">' + courses[i].title + '</span>'+
                    '<span class = "credits">'+ courses[i].courseCredits + '</span></strong>' +
                    '<br><span><strong>Department: </strong></span><span class = "department">' + courses[i].department + '</span><br><span><strong>School: </strong></span><span class = "school">'
                    + courses[i].school + '</span><br><span><strong>Degree: </strong></span><span class = "degree">' + courses[i].degree + '</span><br><p class= "description">' + courses[i].description
                    +'</p>';
            let courseElement = document.createElement('div');
            courseElement.classList.add('course-container');
            courseElement.classList.add('search-container');
            courseElement.innerHTML = coursetemplate.trim();
            maincontentContainer.appendChild(courseElement); 

            }
        }
    }