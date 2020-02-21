let requestURL = "data/courses.json";
let request = new XMLHttpRequest();
let maincontentContainer = document.getElementsByClassName('main-content')[0];
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
const courses = request.response;  
    
if(false || !!document.documentMode)
{
    let coursearray = JSON.parse(courses);
    console.log(coursearray);
    for(let i = 0; i < courses.length; i++)
    {
            //code for IE
            let courseContainerElement = document.createElement("div");
            courseContainerElement.classList.add('course-container');
            let courseCodeElement = document.createElement("span");
            courseCodeElement.appendChild(document.createTextNode(coursearray[i][0]));
            courseCodeElement.appendChild(document.createTextNode(' '));
            courseCodeElement.appendChild(document.createTextNode(coursearray[i][1]));
            courseCodeElement.appendChild(document.createTextNode(' '));
            courseCodeElement.appendChild(document.createTextNode(coursearray[i][2]));
            courseCodeElement.appendChild(document.createTextNode(' ('));
            courseCodeElement.appendChild(document.createTextNode(coursearray[i][3]));
            courseCodeElement.appendChild(document.createTextNode(' credits)'));
            courseContainerElement.appendChild(courseCodeElement); 
            courseContainerElement.appendChild(document.createElement("br"));
            departmentElement = document.createElement("span");
            departmentElement.appendChild(document.createTextNode('Department: '));
            departmentElement.appendChild(document.createTextNode(coursearray[i][6]));
            courseContainerElement.appendChild(departmentElement);
            courseContainerElement.appendChild(document.createElement("br"));
            degreeElement = document.createElement("span");
            degreeElement.appendChild(document.createTextNode('Degree: '));
            degreeElement.appendChild(document.createTextNode(coursearray[i][7]));
            courseContainerElement.appendChild(degreeElement);
            courseContainerElement.appendChild(document.createElement("br"));
            descriptionElement = document.createElement("p");
            descriptionElement = document.createTextNode(coursearray[i][4]);
            courseContainerElement.appendChild(descriptionElement);
            maincontentContainer.appendChild(courseContainerElement);
    }
            
}
        else
        {   
            for(let i = 0; i < courses.length; i++)
            {
            let courseCode =  courses[i][0] + ' '+ courses[i][1];
            //console.log(courseCode);
            let courseTitle = courses[i][2];
            let courseCredits = '('+ courses[i][3]+ ' credits)';
            let description = courses[i][4];
            let department = courses[i][6];
            let school = courses[i][5];
            let degree = courses[i][7];     
            let coursetemplate =    
                    '<strong><span class = "course-code">' + courseCode + '</span> &nbsp; &nbsp;<span class = "course-title">' + courseTitle+ '</span>'+
                    '<span class = "credits">'+ courseCredits + '</span></strong>' +
                    '<br><span><strong>Department: </strong></span><span class = "department">' + department + '</span><br><span><strong>School: </strong></span><span class = "school">'
                    + school + '</span><br><span><strong>Degree: </strong></span><span class = "degree">' + degree+ '</span><br><p class= "description">' + description
                    +'</p>';
            let courseElement = document.createElement('div');
            courseElement.classList.add('course-container');
            courseElement.innerHTML = coursetemplate.trim();
            maincontentContainer.appendChild(courseElement); 
            }
        }
    }