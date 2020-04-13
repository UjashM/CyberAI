let requestURL = "data/programs.json";
let request = new XMLHttpRequest();
let maincontentContainer = document.getElementsByClassName('main-content')[0];
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
    let programlist = request.response;  
    const programs =  ((false || !!document.documentMode))? JSON.parse(programlist): programlist;  
    let content = '';
    //programType-counter for unique id generation
    let programTypecounter = 1;
    let distinctprogramTypes = getDistinctAttributes(programs, "programLevel");
            
    //Iterating over list of programTypes
    distinctprogramTypes.forEach(function(programType){
        //filtering on programType
        programTypeDegrees = programs.filter(function(program){ 	
            return program.programLevel == programType;
                });

        //getting list of distint degrees within school
        programDegrees = programTypeDegrees.map(function(program){ 
                    return program.degree});
                
        let accordioncontent = '';
        //iterating over list of degrees to generate sub-accordion
        
        programDegrees.forEach(function(degree){
        //filtering programs on degrees
            degreeDetails = programTypeDegrees.filter(function(programTypeDegree){ 	
                return programTypeDegree.degree == degree;
            });
            accordioncontent = generateProgramContent(degreeDetails); 
        });
        //generating Id for bootstrap accordion
        let programTypeId = "collapse" + programTypecounter;
        let headingId = "heading" + programTypecounter;
        let accordionElem =   generateAccordionElem(programTypeId, headingId, programType, accordioncontent);
        content = content + accordionElem;
        programTypecounter++;
    });
            //Appending content to DOM
        appendMainContent(maincontentContainer, content);
}

    //generate HTML content for each Academic Program
    let generateProgramContent = function(degreeDetails){
        let departmentElement = (degreeDetails[0].department != 'N/A')? '<strong>Department: </strong>' + degreeDetails[0].department : '';
        let degreeRequirementElem = (degreeDetails[0].description != 'N/A')? '<h4 class = "content-header-no-margin">Degree Requirements</h4>'+
        '<p>' + degreeDetails[0].description + '</p>' : '';
        let programLink = (typeof degreeDetails[0].link != 'undefined')? '<br><strong>Program Link: </strong><a href = "' + degreeDetails[0].link +'">'+ degreeDetails[0].link +'</a>':'';
        let degreeContent = '<p>'+ departmentElement + '<br><strong>School: </strong>' + degreeDetails[0].college + 
         '<br><strong>Credits Hours: </strong>' + degreeDetails[0].credits +  programLink +'</p>'+      
        '<h4 class = "content-header-no-margin">Core Courses </h4>'+
                 degreeDetails[0].coreCourses +
                    degreeRequirementElem;
        let content = '<div class = "accordion-container"><div class = "accordion-header"><h3 class = "content-header-no-margin">'+ degreeDetails[0].degree + '</h3></div><div class = "accordion-content">'+ degreeContent +'</div></div>';
        return content;
    }