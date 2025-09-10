let todoContainer = document.getElementById("todo-container");
let addButton = document.getElementById("add-button");
let taskInput = document.getElementById("task-input");
let saveButton = document.getElementById("saveButton");

let todoList = getTodoListFromLocalStorage();
function appendTodoItems(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    // Create a container for the todo item
    let todoItemContainer = document.createElement("div");
    todoItemContainer.id = todoId;
    todoItemContainer.classList.add("todo-item");
    todoContainer.appendChild(todoItemContainer);

    // Create the checkbox
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    todoItemContainer.appendChild(inputElement);

    // Create the label container
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container");
    todoItemContainer.appendChild(labelContainer);

    // Create the label
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    if(todo.isChecked === true){
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    // Add checkbox click handler
    inputElement.onclick = function () {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    function onTodoStatusChange(checkboxId, labelId, todoId) {
        let checkboxElement = document.getElementById(checkboxId);
        let labelElement = document.getElementById(labelId);
        labelElement.classList.toggle("checked");
        let todoObjectIndex = todoList.findIndex(function(eachTodo){
            let eachTodoId = "todo" + eachTodo.uniqueNo;
            if(eachTodoId === todoId){
                return true;
            }
            else{
                return false;
            }
        });
        let todoObject = todoList[todoObjectIndex];
        if(todoObject.isChecked === true){
            todoObject.isChecked = false;
        }
        else{
            todoObject.isChecked = true;
        }
    }

    // Create the delete button
    let button = document.createElement("button");
    button.textContent = "Delete";
    labelContainer.appendChild(button);

    button.onclick = function () {
        ondeleteTodo(todoId);
    };

    function ondeleteTodo(todoId) {
        let todoElement = document.getElementById(todoId);
        todoContainer.removeChild(todoElement);

        let deleteIndex = todoList.findIndex(function(eachTodo){
            let eachTodoId = "todo" + eachTodo.uniqueNo;
            if(eachTodoId === todoId){
                return true;
            }
            else{
                return false;
            }
        });
        todoList.splice(deleteIndex,1);
        console.log(todoList);
    }
}

// Call the function for each initial todo item
for (let i of todoList) {
    appendTodoItems(i);
}

// Add a new task
addButton.onclick = function () {
    let taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let newTodo = {
        text: taskText,
        uniqueNo: todoList.length + 1,
        isChecked:false
    };

    todoList.push(newTodo);
    appendTodoItems(newTodo);
    taskInput.value = ""; // Clear the input field
};



saveButton.onclick = function(){
    localStorage.setItem("todoList", JSON.stringify(todoList));
};
function getTodoListFromLocalStorage(){
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if(parsedTodoList === null){
        return [];
    }
    else{
        return parsedTodoList;
    }
}
