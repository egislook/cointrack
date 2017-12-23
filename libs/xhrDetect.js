var oldXHR = window.XMLHttpRequest;

function newXHR() {
    var realXHR = new oldXHR();
    realXHR.addEventListener("readystatechange", function() {
        if(realXHR.readyState==4 && realXHR.status==200){
            afterAjaxComplete() //run your code here
        }
    }, false);
    return realXHR;
}
window.XMLHttpRequest = newXHR;
