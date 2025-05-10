
const xhr = new XMLHttpRequest();

xhr.addEventListener("load",  () =>{
    xhr.response;
})
//gets information from the server/backend
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);

xhr.send();
xhr.response