
function getURLBE(){
    var URL;
    if (window.location.host === "localhost:3000"){
        URL = 'http://localhost:8080'
    }else{
        URL = 'https://server-blog-vantiennn.herokuapp.com'
    }
    return URL;
}

export {getURLBE}