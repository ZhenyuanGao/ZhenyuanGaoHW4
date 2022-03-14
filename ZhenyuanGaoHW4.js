import { todoApi } from "./todoApis.js";

let inputBox = document.createElement("input");
let addbut = document.createElement("button");
addbut.textContent = "add Todo";
addbut.addEventListener("click", addTodo);
let ol = document.createElement("ol");
ol.id = "todoList";
/** 
async function deleteTodo(item) {
  console.log(item);
  console.log(item.target.value);

  let element = await todoApi.delTodo(li.value);
}
*/
ol.addEventListener("dblclick", async function (event) {
  //event.stopPropagation();

  let liE = event.target.closest("li");
  console.log(liE);

  if (!liE) return;

  if (!ol.contains(liE)) return;

  lineCross(liE);
});

async function lineCross(liE) {
  const todoArray = await todoApi.todos;
  //  todoArray.forEach(async (item, index) => {
  for (let i = 0; i < todoArray.length; i++) {
    //  console.log(item.content);
    //  console.log(liE.firstChild.textContent);
    if (liE.firstChild.textContent === todoArray[i].content) {
      console.log(i);
      let b = await todoApi.modTodo(i);

      let a = await todoApi.delTodo(i);
      break;
    }
  }
  //  });

  liE.classList.add("lineCross"); // highlight the new td
}

async function showtodo() {
  let result = await todoApi.addTodo({
    content: inputBox.value,
    isCompleted: false,
  });
  // console.log(result);
  let li = document.createElement("li");

  li.textContent = await todoApi.todos[todoApi.todos.length - 1].content;
  ol.appendChild(li);
  // li.value = await todoApi.todos.length;
  //console.log(li.value);

  let delbut = document.createElement("button");
  delbut.textContent = "delete Todo";

  //delbut.value = (await todoApi.todos.length) - 1;
  let inputval = delbut.value;

  delbut.addEventListener("click", async function () {
    ol.removeChild(li);
  });

  li.appendChild(delbut);

  return li;
}
function addTodo() {
  return new Promise((resolve, reject) => {
    if (inputBox.value != null) {
      // console.log("hello");
      let delbut = document.createElement("button");
      showtodo();
      // li.appendChild(delbut);
      resolve("hello");
    } else {
      reject("input box is empty");
    }
  });

  //
}

document.body.appendChild(inputBox);
document.body.appendChild(addbut);
document.body.appendChild(ol);

//addTodo();
async function showAllTodo() {
  console.log(todoApi.getAllTodos());
}
let showbutton = document.createElement("button");
showbutton.addEventListener("click", showAllTodo);

showbutton.textContent = "show all todos";
document.body.appendChild(showbutton);
