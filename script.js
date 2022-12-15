const nameField = document.querySelector("#name-field");
const prioritaCheck = document.querySelector("#priorita-check");

const taskForm = document.querySelector("#task-form");

const ulTasks = document.querySelector(".list-tasks");

const totaleTasks = document.querySelector("#total-tasks");
const spanPrio = document.querySelector("#total-prio");
const spanComun = document.querySelector("#total-comun");

const alert = document.querySelector(".alert");

const STORAGE_KEY = "__todo-list__"
const prevList = localStorage.getItem(STORAGE_KEY);


let listTasks = [];

if(prevList){
    listTasks = JSON.parse(prevList);
    calculateTotal();
    renderList();
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameField.value.trim();
  const priorita = prioritaCheck.checked;

  addTask(name, priorita);

  taskForm.reset();
  nameField.focus();
});

function addTask(name, priorita) {
  listTasks.push({
    name,
    priorita,
  });
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listTasks));

  calculateTotal();

  renderList();
  showAlert();
}

function calculateTotal() {
  let countPrio = 0;
  let countComu = 0;
  for (let i = 0; i < listTasks.length; i++) {
    if (listTasks[i].priorita) {
      countPrio += 1;
    } else {
      countComu += 1;
    }
  }
  const total = countPrio + countComu;

  totaleTasks.innerHTML = total;
  spanPrio.innerText = countPrio;
  spanComun.innerText = countComu;
}

function renderList() {
 ulTasks.innerHTML = "";
  for (let i = 0; i < listTasks.length; i++) {
    const element = createListElement(i);
    ulTasks.innerHTML += element;
  }
  setDeleteButton();
}

function createListElement(index) {
  const task = listTasks[index];
  return `
    <li class="task">
    <div class="task-info">
        <p>${task.name}</p>
        <hr>
        <label for="p">Priorita?</label>
        <input id="p" class="checktask" type="checkbox" 
        ${task.priorita ? "checked" : ""} disabled />
    </div>
    <button class="task-button" data-index=${index}>❌</button>
    </li>
    `;
}

function setDeleteButton() {

    const deleteButtons = document.querySelectorAll(".task-button");

    for (let i = 0; i < listTasks.length; i++) {
        const button  = deleteButtons[i];
        
        button.addEventListener("click",()=> {
            const index = button.dataset.index;
            removeTask(index)
        });
    }
  }

function removeTask(index){
    listTasks.splice(index, 1);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(listTasks));
    
    calculateTotal();
    renderList();
    showAlert();

}




/**************  ALERT  ********** */
let endDate;
let countTimer;
function showAlert() {
    alert.classList.remove("hidden");

     endDate = new Date();
    endDate = endDate.getSeconds() + 1.2;
    
     countTimer = setInterval(timer, 1000);
}

function timer() {
  const nowDate = new Date().getSeconds();

  if (nowDate > endDate) {
    alert.classList.add("hidden");
    clearInterval(countTimer);
  }
}
