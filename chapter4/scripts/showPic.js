function showPic(whichpic){
    if(!document.getElementById)return false;
    var source=whichpic.getAttribute("href");
    var placeholder=document.getElementById("placeholder");
    if(placeholder.nodeName!="IMG")return false;
    placeholder.setAttribute("src",source);
    if(document.getElementById("description")){
    var text=whichpic.getAttribute("title")?whichpic.getAttribute("title"):" ";
    var description=document.getElementById("description");
        if(description.firstChild.nodeType==3){
    description.firstChild.nodeValue=text;}
    }
    return true;
}
window.onload=prepareGallery;
function prepareGallery(){
    if(!document.getElementsByTagName||!document.getElementById)return false;
    if(!document.getElementById("imagegallery"))return false;
        
    var gallery=document.getElementById("imagegallery");
    var links=gallery.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        links[i].onclick=function(){
            return !showPic(this);
        }
    }
}