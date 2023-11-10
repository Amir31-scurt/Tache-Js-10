let TaskInput = document.getElementById("InputTask");
let tasks = document.getElementById("tasks");
const button = document.getElementById("btnSub");
const ToDOColor = "bg-danger";
const DoingColor = "bg-warning";
const DoneColor = "bg-success";
button.setAttribute('disabled', '');
// Add Button Activation
function enableButton(){
    const taskValue = TaskInput.value;
    if (taskValue.length > 3) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', '');
    }
}
TaskInput.addEventListener("input", enableButton);
// Local Storge
window.addEventListener("load", () => {
    tasks.innerHTML = localStorage.getItem("TasksStoraged") || "";
});
function TaskToLocStor() {
    localStorage.setItem("TasksStoraged", tasks.innerHTML);
}
// Add Tache
function AddToBoard(){
    tasks.innerHTML += `
    <div class="bg-danger bg-opacity-75 border border-dark border-2 border-opacity-50 rounded p-2 d-flex flex-column gap-2 justify-content-between align-items-center" id="bgColor">
        <span class="fw-bold text-center">${TaskInput.value}</span>
        <div class="editButtons d-flex gap-2">
            <button class="btn btn-danger mb-2 btn-sm" id="ToDoBtn" onclick="ToDo(this)">To Do <i class="fa-solid fa-file-pen"></i></button>
            <button class="btn btn-warning text-light mb-2 btn-sm" id="DoingBtn" onclick="Doing(this)">Doing <i class="fa-solid fa-hourglass-start"></i></button>
            <button class="btn btn-success mb-2 btn-sm" id="DoneBtn" onclick="Done(this)">Done <i class="fa-solid fa-check"></i></button>
            <button class="btn btn-secondary mb-2 btn-sm"><i class="fa-solid fa-trash-alt fs-5" id="delete" onclick="Delete(this)"></i></button>
        </div>
    </div>`

    TaskToLocStor();

    enableButton();

    TaskInput.value = "";
}
// Delete Function
function Delete(e){
    e.parentElement.parentElement.parentElement.remove();
    const tk = "TasksStoraged";
    localStorage.removeItem(tk);
    TaskToLocStor();
}
//Change Background of task function
function TaskStatus(e, status, color) {
    const divElement = e.parentElement.parentElement;
    if (divElement) {
        const classList = divElement.classList;
        const newClassNames = [];

        for (const className of classList) {
            if (className.includes("bg")) {
                newClassNames.push(color, "bg-opacity-75");
            } else {
                newClassNames.push(className);
            }
        }

        divElement.className = newClassNames.join(" ");
    }

    TaskToLocStor();
}
//To Do button 
function ToDo(e) {
    TaskStatus(e, "ToDo", ToDOColor);
}
//Doing button 
function Doing(e) {
    TaskStatus(e, "Doing", DoingColor);
}
//Done button 
function Done(e) {
    TaskStatus(e, "Done", DoneColor);
    e.setAttribute("disabled", "");
    e.previousElementSibling.setAttribute("disabled", "");
    e.previousElementSibling.previousElementSibling.setAttribute("disabled", "");
    e.parentElement.parentElement.classList.add("text-light")
    TaskToLocStor();
}