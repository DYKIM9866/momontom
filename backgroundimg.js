const body = document.querySelector("body");
const IMG_SU = 6;


function getRandom(){
    return Math.floor(Math.random()*6)+1
}

function printImg(num){
    const image = new Image();
    image.src = `image/${num}.jpg`;
    image.classList.add("bgimage");
    body.prepend(image);
}

function init(){
    const random = getRandom();
    printImg(random);
}

init();