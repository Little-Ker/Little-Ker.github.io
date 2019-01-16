let image01=document.querySelector(".image1");
let imageBtn=document.querySelector(".traver img");
let closeBtn=document.querySelector(".blackBox");

console.log(image01);
console.log(imageBtn);
console.log(closeBtn);

imageBtn.onclick=function(){
    image01.classList.add("blackBoxShow")
}