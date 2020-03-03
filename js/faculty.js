let requestURL = "data/faculties.json";
let request = new XMLHttpRequest();
let maincontentContainer = document.getElementsByClassName('main-content')[0];
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
const faculties = request.response;  
console.log(faculties);
    
if(false || !!document.documentMode)
{
    /*let coursearray = JSON.parse(courses);
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
    }*/           
}

        else
        {   
            let content = '';
            //School-counter for unique id generation
            let schoolcounter = 1;
            //finding list of distinct schools
            schools = faculties.map(function(faculty){ 
                return faculty.school});
            distinctSchools = schools.filter(function(v, i, a){
                return a.indexOf(v) === i;
             });
            
            distinctSchools.sort();
            //Iterating over list of schools
            distinctSchools.forEach(function(school){

                schoolFaculties = faculties.filter(function(faculty){ 	
                    return faculty.school == school
                });
                //getting list of distint department within school
                schoolDepartments = schoolFaculties.map(function(faculty){ 
                    return faculty.department});
                
                departments = schoolDepartments.filter(function(v, i, a){
                        return a.indexOf(v) === i;  
                });
                departments.sort();
                let accordioncontent = '';
                //iterating over list of degrees to generate sub-accordion
                departments.forEach(function(department){
                    //finding list of courses relevant to degree and department
                    departmentFaculties = schoolFaculties.filter(function(faculty){ 	
                        return faculty.department == department;
                    });
                    departmentFaculties.sort(function(a, b){
                        if(a.lastName > b.lastName)
                            return 1;
                        
                        else
                            return -1;

                    });
                    let departmentFacultyContent = '';
                    //Generating faculty-info for specific department
                    departmentFaculties.forEach(function(faculty){

                        let fulldepartment = (department != 'Other Department')? department + ', ' + school : school;
                        departmentFacultyContent = departmentFacultyContent +  '<div class = "faculty-info"><img class = "faculty-image" src = ""/> <h2 class = "content-header-no-margin">' +
                        '<a class = "no-link-decoration" href = ' + faculty.facultyLink + '>' + faculty.fullName + '</a></h2><h5 class = "content-header faculty-title">'+ faculty.title + ',<br>'+
                        fulldepartment + '</h5><p class = "faculty-description"><strong>Research Interests: </strong>'+ faculty.researchInterest + '<br><strong>Email: </strong> <a class = "no-link-decoration" href = mailto:' + faculty.email + 
                        '>'+ faculty.email+ '</a><br><strong>Phone: </strong>'+ faculty.contact + '</p></div>'; 
                    });

                    accordioncontent += '<div class = "accordion-container"><div class = "accordion-header"><h3 class = "content-header-no-margin">'+ department + '</h3></div><div class = "accordion-content">'+ departmentFacultyContent +'</div></div>';
                });

                //generating Id for bootstrap accordion
                let schoolId = "collapse" + schoolcounter;
                let headingId = "heading" + schoolcounter;
                let accordionElem =  '<div class = "card"><div class="card-header" id="'+ headingId + '">' +
                          '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#'+ schoolId + '" aria-expanded="true" aria-controls="' + schoolId + '">'+
                            '<h2 class = "content-header-no-margin">' + school + '</h2></button></div>'
                        + '<div id="'+ schoolId + '" class = "collapse show" aria-labelledby= "'+ headingId + '"data-parent=""> <div class = "card-body">'
                        + accordioncontent +'</div></div></div>';  
                content = content + accordionElem;
                schoolcounter++;
            });
            //Appending content to DOM
            let accordionElement = document.createElement('div');
            accordionElement.classList.add('accordion');
            accordionElement.id = 'accordionExample';
            accordionElement.innerHTML = content.trim();
            maincontentContainer.appendChild(accordionElement);
        }
    }