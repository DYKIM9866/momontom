

const form = document.querySelector("form"),
        input = form.querySelector("input"),
        welcome = document.querySelector(".welcome"),
        wel = welcome.querySelector("span"),
        delBtn = welcome.querySelector("img"),
        toDoForm = document.querySelector(".inputToDo"),
        toDoInput = toDoForm.querySelector("input"),
        toDoList = document.querySelector(".toDoList");

let toDos = [];

//host 넣고 저장하는 곳
function saveUser(user){
    localStorage.setItem("currentUser",user);
}

function getHost(){
    welcome.classList.remove("showing");
    form.classList.add("showing");
    form.addEventListener("submit",function(event){
        event.preventDefault();
        if(input.value === ""){
            alert("You must put the host");
            host();
            return;
        }
        const getUser = input.value;
        saveUser(getUser);
        showing();
        printHost(getUser);
    });
}

function printHost(user){
    form.classList.remove("showing");
    welcome.classList.add("showing");
    delBtn.addEventListener("click",function(){
        localStorage.removeItem("currentUser");
        localStorage.removeItem("toDos");
        hiding();
        input.value ="";
        host();
    });

    wel.innerText = `Welcome ${user}`;
}

function host(){
    const currentUser = localStorage.getItem("currentUser");
    if(currentUser === null){
        getHost();
    }else{
        printHost(currentUser);
    }
}

//todolist 작성되는 곳
function saveToDos(){
    localStorage.setItem("toDos",JSON.stringify(toDos));
}

function printToDo(text,delline){
    console.log(delline);
    console.log(typeof(delline));
    const li = document.createElement("li");
    const delbtn = document.createElement("img");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delbtn.src = "image/imo-x.png";
    delbtn.classList.add("imo-x");
    delbtn.addEventListener("click",function(event){
        const btn = event.target;
        const li = btn.parentNode;
        toDoList.removeChild(li);

        const filterToDos = toDos.filter(function(toDo){
            return toDo.id !== parseInt(li.id);
        }); 
        toDos = filterToDos;
        saveToDos();
        
    });
    
    span.innerText = text;
    if(delline === 1){
        span.classList.add("delLine");
    }
    span.addEventListener("click",function(event){
        if(delline === 0){
            span.classList.add("delLine");
            delline = 1;
        }else if(delline === 1){
            span.classList.remove("delLine");
            delline = 0;
        }
        const filterToDos = toDos.filter(function(toDo){
            if(toDo.text == text){
                toDo.delLine = delline;
            }
            return toDo;
        });
        toDos = filterToDos;
        saveToDos();
    });
    li.appendChild(span);
    li.appendChild(delbtn);
    li.id = newId;
    li.classList.add("toDoList-li");
    toDoList.appendChild(li);
    const toDoObj ={
        text : text,
        id : newId,
        delLine: delline
    };
    toDos.push(toDoObj);
    saveToDos();
}

function hiding(){
    toDoForm.classList.remove("showing");
    toDoList.classList.remove("showing");
    
}

function showing(){
    toDoForm.classList.add("showing");
    toDoList.classList.add("showing");
}

function loadToDos(){
    const currentUser = localStorage.getItem("currentUser");
    if(currentUser === null){
        hiding();
    }else{
        showing();
    }

    const loadedToDos = localStorage.getItem("toDos");
    if(loadedToDos === null){

    }else{
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo){
            printToDo(toDo.text,toDo.delLine);
        });
    }
}


function init(){
    
    host();
    loadToDos();
    toDoForm.addEventListener("submit",function(event){
        event.preventDefault();
        const text = toDoInput.value;
        printToDo(text,0);
        toDoInput.value = "";
    });
}

init();