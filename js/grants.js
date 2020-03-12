let requestURL = "data/grants.json";
let request = new XMLHttpRequest();
//getting content Element to append grants information
let maincontentContainer = document.getElementsByClassName('main-content')[0];
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
    const grants = request.response;  
    //condition for checking if browser is Internet Explorer
    let grant =  ((false || !!document.documentMode))? JSON.parse(grants): grants;
    
    let content = '';
    //Iterating over grants array to generate grant content
    for(let i = 0; i < grant.length; i++)
    {
        let imageElement = (grant[i].image == '')? '' : '<img class = "agency-logo" src = "'+ grant[i].image +'" />';
        content = content + '<div class = "opportunity-container search-container">'+ imageElement + '<h4 class = "opp-header black-content-header-no-margin">'+ grant[i].title +'</h4>'+
                   '<div class = "opp-details display-flex">'+
                        '<div class = "col-sm-12 col-md-12 col-lg-6 col-xl-6">'+
                            '<i class="fas fa-flag"></i> <strong>Agency Name: </strong>' + grant[i].agency +
                            '<br>' +
                            '<i class="fas fa-dollar-sign"></i> <strong>Estimated Funding: </strong>' + grant[i].funding +
                            '<br>' +
                        '</div><div class = "col-sm-12 col-md-12 col-lg-6 col-xl-6">' +
                            '<i class="fas fa-calendar-day"></i> <strong>Posted Date: </strong>' + grant[i].postDate +
                            '<br><i class="fas fa-calendar-day"></i> <strong>Close Date: </strong>' + grant[i].closeDate +
                            '<br></div></div>' +
                   '<p class = "opp-description">' + grant[i].description + '</p>' +
                   '<button type = "button" class = "details-button" onclick = "location.href = \'' + grant[i].link + '\'">View Details</button></div>';
    }
    //Appending grants to main content Element  
    let contentElement = document.createElement('div');
    contentElement.innerHTML = content.trim();
    maincontentContainer.appendChild(contentElement);
}