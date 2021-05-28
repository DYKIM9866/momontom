const toDoForm = document.querySelector(".inputToDo"),
        toDoInput = toDoForm.querySelector("input"),
        toDoList = document.querySelector(".toDoList");
let toDos = [];

function saveToDos(){
    localStorage.setItem("toDos",JSON.stringify(toDos));
}

function printToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("img");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.src = "image/imo-x.png";
    delBtn.classList.add("imo-x");
    delBtn.addEventListener("click",function(event){
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
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    li.classList.add("toDoList-li");
    toDoList.appendChild(li);
    const toDoObj ={
        text : text,
        id : newId
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
            printToDo(toDo.text);
        });
    }
}

function initToDo(){
    loadToDos();
    toDoForm.addEventListener("submit",function(event){
        event.preventDefault();
        const text = toDoInput.value;
        printToDo(text);
        toDoInput.value = "";
    });
}

initToDo();