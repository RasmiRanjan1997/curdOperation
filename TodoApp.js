showtask();
let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");

//add item
addtaskbtn.addEventListener("click", function () {
  addtaskinputval = addtaskinput.value;
  if (addtaskinputval != "") {
    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
      taskObj = [];
    } else {
      taskObj = JSON.parse(webtask);
    }
    taskObj.push(addtaskinputval);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
  }

  showtask();
  addtaskinput.value = "";
});

//show items
function showtask() {
  let webtask = localStorage.getItem("localtask");
  if (webtask == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(webtask);
  }
  let html = " ";
  let addedtasklist = document.getElementById("addedtasklist");
  taskObj.forEach((item, index) => {
    html += `<tr>
    <th scope="row">${index + 1}</th>
    <td>${item}</td>
    <td><button type="button" class="btn btn-warning" onclick="edittask(${index})">Edit</button></td>
    <td><button type="button" class="btn btn-danger" onclick="deleteitem(${index})">Delete</button></td>
    </tr>`;
  });
  addedtasklist.innerHTML = html;
}

//edie task

function edittask(index) {
  let saveindex = document.getElementById("saveindex");
  let savetaskbtn = document.getElementById("savetaskbtn");
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  addtaskinput.value = taskObj[index];
  saveindex.value = index;
  addtaskbtn.style.display = "none";
  savetaskbtn.style.display = "block";
}
//savetask

let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function () {
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  let saveindex = document.getElementById("saveindex").value;
  taskObj[saveindex]=addtaskinput.value;
  savetaskbtn.style.display = "none";
  addtaskbtn.style.display = "block";
  localStorage.setItem("localtask", JSON.stringify(taskObj));  
  addtaskinput.value = "";
  showtask()
});
//deleteitem

function deleteitem(index){
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  taskObj.splice(index,1);
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showtask();  
}