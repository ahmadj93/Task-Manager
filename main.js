var mode = 0;
let arr = [];
let bt = document.getElementById("add-btn");

let inn = document.getElementById("input-task");
bt.addEventListener("click", () => {
  add();
  refresh();
});

document
  .getElementById("btn-filter-by-status")
  .addEventListener("click", filterByStatus);
document
  .getElementById("btn-sort-by-priority")
  .addEventListener("click", sortByPriority);
document
  .getElementById("btn-sort-by-date")
  .addEventListener("click", sortByDate);
document.getElementById("btn-show-all")
.addEventListener("click", refresh);

function add() {
  let task_name = document.getElementById("in-name").value;
  let task_status = document.getElementById("ch1").checked;
  let task_prio = document.getElementById("priority").value;
  let task_date = document.getElementById("date").value;

  if (task_name && task_prio && task_date) {
    if (mode == 0) {
      arr.push({ task_name, task_status, task_prio, task_date });
      document.getElementById("in-name").value = null;
      document.getElementById("ch1").checked = false;
      document.getElementById("priority").value = null;
      document.getElementById("date").value = null;
      mode = 0;
    } else {
      //edit
    }
  } else {
    alert("please enter all the required data");
  }
}

function addCheckboxEventListeners() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener("click", function () {
      arr[index].task_status = this.checked;
      updateUI(arr);
    });
  });
}

function refresh() {
  var newTable = document.createElement("table");
  arr.forEach((element) => {
    console.log(element.task_status);

    let row = document.createElement("tr");
    let d1 = document.createElement("td");
    let d2 = document.createElement("td");
    let d3 = document.createElement("td");
    let d4 = document.createElement("td");
    let d5 = document.createElement("td");

    d1.textContent = element.task_name;
    if (element.task_status) d2.innerHTML = `<input type="checkbox" checked>`;
    else d2.innerHTML = `<input type="checkbox">`;
    d3.textContent = element.task_date;
    d4.textContent = element.task_prio;
    d5.innerHTML = `<button class="delete" id="delete-btn"  onclick="deleteTask(this)"> Delete </button>`;

    row.appendChild(d1);
    row.appendChild(d2);
    row.appendChild(d3);
    row.appendChild(d4);
    row.appendChild(d5);
    newTable.appendChild(row);
  });
  document.getElementById("taskrows").innerHTML = newTable.innerHTML;
  addCheckboxEventListeners();
}

function getFirstCellData(button) {
  const row = button.parentElement.parentElement;
  const firstCellContent = row.cells[0].textContent;
  alert(`Content of the first cell in the row: ${firstCellContent}`);
}

function deleteTask(button) {
  let task = button.parentElement.parentElement.cells[0].textContent;
  const newArray = arr.filter((obj) => obj.task_name !== task);
  arr = newArray;
  refresh();
}

function filterByStatus() {
  const filteredTasks = arr.filter((task) => task.task_status);
  updateUI(filteredTasks);
}

function updateUI(tasks) {
  var newTable = document.createElement("table");
  tasks.forEach((element) => {
    let row = document.createElement("tr");
    let d1 = document.createElement("td");
    let d2 = document.createElement("td");
    let d3 = document.createElement("td");
    let d4 = document.createElement("td");
    let d5 = document.createElement("td");

    d1.textContent = element.task_name;
    if (element.task_status) d2.innerHTML = `<input type="checkbox" checked>`;
    else d2.innerHTML = `<input type="checkbox">`;
    d3.textContent = element.task_date;
    d4.textContent = element.task_prio;
    d5.innerHTML = `<button class="delete" onclick="deleteTask(this)"> Delete </button>`;

    row.appendChild(d1);
    row.appendChild(d2);
    row.appendChild(d3);
    row.appendChild(d4);
    row.appendChild(d5);
    newTable.appendChild(row);
  });
  document.getElementById("taskrows").innerHTML = newTable.innerHTML;
}

function sortByPriority() {
  arr.sort((a, b) => a.task_prio - b.task_prio);
  updateUI(arr);
}
function sortByDate() {
  arr.sort((a, b) => new Date(a.task_date) - new Date(b.task_date));
  updateUI(arr);
}
