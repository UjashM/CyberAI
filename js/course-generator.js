let requestURL = "data/courses.json";
let request = new XMLHttpRequest();
let maincontentContainer = document.getElementsByClassName('main-content')[0];
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
const courses = request.response;  
//console.log(courses);
    
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
            let content = '';
            //Department-counter for unique id generation
            let deptcounter = 1;
            //finding list of distinct departments
            courseDepartments = courses.map(function(course){ 
                return course.department});
            distinctDepartments = courseDepartments.filter(function(v, i, a){
                return a.indexOf(v) === i;
             });
            
            distinctDepartments.sort();
            //Iterating over list of departments
            distinctDepartments.forEach(function(department){

                departmentCourses = courses.filter(function(course){ 	
                    return course.department == department
                });
                //getting list of distint degrees within department
                departmentDegrees = departmentCourses.map(function(course){ 
                    return course.degree});
                
                degrees = departmentDegrees.filter(function(v, i, a){
                        return a.indexOf(v) === i;  
                });
                degrees.sort();
                let accordioncontent = '';
                //iterating over list of degrees to generate sub-accordion
                degrees.forEach(function(degree){
                    //finding list of courses relevant to degree and department
                    degreeCourses = departmentCourses.filter(function(course){ 	
                        return course.degree == degree
                    });

                    let degreeCoursecontent = '';
                    //Generating course-content for specific degree
                    degreeCourses.forEach(function(course){
                        degreeCoursecontent = degreeCoursecontent +  '<div class = "search-container course-container"><strong><span class = "course-code">' + course.courseCode + '</span> &nbsp; &nbsp;<span class = "course-title">' + course.title + '</span>'+
                        '<span class = "credits">'+ course.courseCredits + '</span></strong>' +
                        '<br><span><strong>Department: </strong></span><span class = "department">' + course.department + '</span><br><span><strong>School: </strong></span><span class = "school">'
                        + course.school + '</span><br><span><strong>Degree: </strong></span><span class = "degree">' + course.degree + '</span><br><p class= "description">' + course.description
                        +'</p></div>'; 
                    });

                    accordioncontent += '<div class = "accordion-container"><div class = "accordion-header"><h3 class = "content-header-no-margin">'+ degree + '</h3></div><div class = "accordion-content">'+ degreeCoursecontent +'</div></div>';
                });

                //generating Id for bootstrap accordion
                let deptId = "collapse" + deptcounter;
                let headingId = "heading" + deptcounter;
                let accordionElem =  '<div class = "card"><div class="card-header" id="'+ headingId + '">' +
                          '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#'+ deptId + '" aria-expanded="true" aria-controls="' + deptId + '">'+
                            '<h2 class = "content-header-no-margin">' + department + '</h2></button></div>'
                        + '<div id="'+ deptId + '" class = "collapse" aria-labelledby= "'+ headingId + '"> <div class = "card-body">'
                        + accordioncontent +'</div></div></div>';  
                content = content + accordionElem;
                deptcounter++;
            });
            //Appending content to DOM
            let accordionElement = document.createElement('div');
            accordionElement.classList.add('accordion');
            accordionElement.id = 'accordionExample';
            accordionElement.innerHTML = content.trim();
            maincontentContainer.appendChild(accordionElement);
        }
    }