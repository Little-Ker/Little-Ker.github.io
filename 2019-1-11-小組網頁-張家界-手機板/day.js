let btnPre = document.querySelector(".btnPre");
let btn1 = document.querySelector(".btn1");
let btn2 = document.querySelector(".btn2");

let btn1img = document.querySelector(".btn1 img");
let btn1word = document.querySelector(".btn1 p");
let btn2img = document.querySelector(".btn2 img");
let btn2word = document.querySelector(".btn2 p");
let day = 1;


btnPre.onclick = function () {
    day--;
    if (day == 0) {
        day = 1;
        
    }
    chooseday();

}
// 第二天行程按鈕
btn2.onclick = function () {
    day = 2;
    chooseday();
}


function chooseday(){
    if(day==1){
        btn1img.classList.add("cover");
        btn1word.classList.remove("cover");

        
        btn2img.classList.remove("cover");
        btn2word.classList.add("cover");
}
if(day==2){
        btn1img.classList.remove("cover");
        btn1word.classList.add("cover");

        
        btn2img.classList.add("cover");
        btn2word.classList.remove("cover");
}
}
