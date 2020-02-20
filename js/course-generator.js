const coursetemplate = document.getElementById('course-template');

let requestURL = "data/courses.json"
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
    const courses = request.response;
    courses.forEach(course => {
        const instance = document.importNode(coursetemplate.content, true);
        instance.querySelector('.course-code').innerHTML = course[0] + ' '+ course[1];
        instance.querySelector('.course-title').innerHTML = course[2];
        instance.querySelector('.description').innerHTML = course[4]; 
        instance.querySelector('.department').innerHTML = course[6];
        instance.querySelector('.school').innerHTML = course[5];
        instance.querySelector('.credits').innerHTML = '('+ course[3]+ ' credits)'; 
        instance.querySelector('.degree').innerHTML = course[7];
        document.getElementsByClassName('main-content')[0].appendChild(instance);
    })
}