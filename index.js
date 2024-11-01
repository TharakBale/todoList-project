let saveEl = document.getElementById("saveTodoButton");

function getListFromLocalStorage(){
  let getItem = localStorage.getItem("todoList");
  let parsedItem = JSON.parse(getItem);

  if (parsedItem === null){
    return [];
  } else{
    return parsedItem;
  }
}

let todoList = getListFromLocalStorage()

saveEl.onclick = function(){
  let stringifiedList = JSON.stringify(todoList);
  localStorage.setItem("todoList",stringifiedList);
}


function onStatusChange(labelId,todoId,cheackboxId){
  let labelEl = document.getElementById(labelId);
  labelEl.classList.toggle("strike-through");

  let todoObjectIndex = todoList.findIndex(function(eachTodo){
    let eachTodoId = "todo" + eachTodo.uniqueNo;

    if(todoId === eachTodoId){
      return true;
    }else{
      return false
    }
  })
  let todoObject = todoList[todoObjectIndex]

  if(todoObject.isChecked === true){
    todoObject.isChecked = false;
  }else{
    return  todoObject.isChecked = true;
  }
}

function onDelete(todoId){
  let todoEl = document.getElementById(todoId);
  todoItemsContainerEl.removeChild(todoEl);

  let deleteIndex = todoList.findIndex(function(eachTodo){
    let eachTodoId = "todo" + eachTodo.uniqueNo;

    if (eachTodoId === todoId){
      return true;
    } else {
      return false;
    }
  });
  
  todoList.splice(deleteIndex,1)

}

let todoItemsContainerEl = document.getElementById("todoItemsContainer");
  
function createAppendTodo(todo){

 let todoId = "todo" + todo.uniqueNo;
 let checkboxId = "checkbox" + todo.uniqueNo;
 let labelId = "label" + todo.uniqueNo;


      
  let listItem = document.createElement("li");
  listItem.id = todoId;
  listItem.classList.add("todo-item-container");
  todoItemsContainerEl.appendChild(listItem);
          
  let inputEl = document.createElement("input");
  inputEl.type = "checkBox";
  inputEl.id = checkboxId;
  inputEl.checked = todo.isChecked;
  inputEl.classList.add("checkbox-input");
  inputEl.onclick = function(){
    onStatusChange(labelId,todoId,checkboxId);
  }
  listItem.appendChild(inputEl);
      
  let labelContainerEl = document.createElement("div");
  labelContainerEl.classList.add("label-container");
  listItem.appendChild(labelContainerEl);
      
  let taskName = document.createElement('label');
  taskName.setAttribute("for",checkboxId);
  taskName.id = labelId;
  taskName.textContent = todo.text;
  taskName.classList.add("checkbox-label");
  if(todo.isChecked === true){
    taskName.classList.add("strike-through");
  }
  labelContainerEl.appendChild(taskName);
      
  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-containet");
  labelContainerEl.appendChild(deleteIconContainer);
      
  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far","fa-trash-alt","delete-icon");
  deleteIcon.onclick = function(){
    onDelete(todoId);
  }
  deleteIconContainer.appendChild(deleteIcon);
  
}

for(let todo of todoList){
  createAppendTodo(todo);
}

function onAddTodo() {
  let todoUserInputEl = document.getElementById("todoUserInput");
  let userInputEl = todoUserInputEl.value;

  let todosCount = todoList.length;
  todosCount = todosCount +1;

  if(userInputEl === ""){
    alert("enter a vlid text");
    return;
  }

  let newTodo = {
    text: userInputEl,
    uniqueNo: todosCount,
    isChecked: false
  };
  createAppendTodo(newTodo);
  todoUserInputEl.value = "";
  todoList.push(newTodo);
  
}

let onTodoAddButton  = document.getElementById("onTodoAddButton");

onTodoAddButton.onclick = function() {
  onAddTodo();
}
  
