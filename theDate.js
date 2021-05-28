const theDate = document.querySelector(".theDate"),
    date = theDate.querySelector(".date"),
    time = theDate.querySelector(".time");

yo = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

function getTime(){
    
    const today = new Date();

    const year = today.getFullYear(),month =today.getMonth(),ill = today.getDate(),day = yo[today.getDay()]
                    ,hour = today.getHours(),minute = today.getMinutes(), second = today.getSeconds();

    date.innerHTML = `${year}년 ${month+1}월 ${ill}일 ${day}`;

    time.innerHTML = `${hour>9?`${hour}`:`0${hour}`} : ${minute > 9? `${minute}`:`0${minute}`} : ${second>9?`${second}`:`0${second}`}`;; 
}

function init(){
    getTime();
    setInterval(getTime,1000);
}

init();