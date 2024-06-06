
const input_Box = document.getElementById("input_box");
const input_box_btn = document.getElementById("input_box_btn")
const btn_update_text = input_box_btn.innerText;
const task_Table = document.getElementById("task_table");

let taskPriority = document.getElementById("priority");

let TaskDataArr = [];
let editId = null;
localStorage.setItem("data",JSON.stringify([]));
let objStr = localStorage.getItem('data');

window.onload = () => {
        DisplayInfo()
}
// console.log(objStr);

if (objStr) {
    TaskDataArr = JSON.parse(objStr);
}
// console.log(TaskDataArr);
const AddTask = () => {


    if (input_Box.value == '') {
        alert("Task cannot be empty!");
    }
    else {
        let li = document.createElement('td');
        // input_box_btn.onclick(() => {
        task_name = input_Box.value;
        let task_priority = taskPriority.value;
        if (editId != null) {
            //edit
            TaskDataArr.splice(editId, 1, { 'name': task_name, 'status': "Incomplete", 'priority': task_priority })
        } else {
            //insert
            TaskDataArr.push({ 'name': task_name, 'status': "Incomplete", 'priority': task_priority })
        }

        //  })

        SaveInfo(TaskDataArr);
        DisplayInfo();
        input_box_btn.innerText = btn_update_text;

        li.innerHTML = input_Box.value;
        taskName = document.getElementById('task_name');

        // console.log(li);
        //taskName.innerHTML = input_Box.value;
        // task_Table.appendChild(li);
    }
    input_Box.value = "";
}
const SaveInfo = (TaskDataArr) => {
    let data = JSON.stringify(TaskDataArr);
    localStorage.setItem("data", data);
}

let taskStatus;
const StatusCall = (id) => {

    let t_name = TaskDataArr[id].name;
    let t_priority = TaskDataArr[id].priority;
    taskStatus = "";
    let checkbox = document.getElementById(`checkbox${id}`);
    console.log(id);
    if (checkbox.checked == true) {
        taskStatus = "Completed"

    } else {
        taskStatus = "Incompleted"

    }
    TaskDataArr.splice(id, 1, { 'name': t_name, 'status': taskStatus, 'priority': t_priority })
    SaveInfo(TaskDataArr);
    DisplayInfo();

}
//For Displaying Data-
const DisplayInfo = () => {

    let statement = '';
    TaskDataArr.forEach((task, i) => {

        let checkTemp = task.status == "Completed" && "checked";
        statement += `<tr>
        <td><input type="checkbox" ${checkTemp} name="${i}" id="checkbox${i}" onchange="StatusCall(${i})"> </td>
        <td>${i + 1}</td>
        <td id="task_name">${task.name}</td>
        <td>${task.priority}</td>
        <td>${task.status}</td>
        <td>
            <span class="btn_edit" onclick="EditInfo(${i})">Edit</span> 
            <span class="btn_danger"  onclick="DeleteInfo(${i})">Delete</span> 
        </td>
       </tr>`
    })
    task_table.innerHTML = statement;
}
//For deleting the record
const DeleteInfo = (id) => {
    // alert(id);
    TaskDataArr.splice(id, 1);
    SaveInfo(TaskDataArr);
    DisplayInfo();
}
//For Editing the record
const EditInfo = (id) => {
    //alert(id);
    editId = id;
    input_Box.value = TaskDataArr[id].name;
    input_box_btn.innerText = "Save Changes"
}

// filtering by status
let status1 = document.getElementById('statusSelect');
console.log(status1.value);

const sortFilter = () => {
     const result = TaskDataArr.filter((data) => {
        console.log(data);
        console.log(status1.value);
        if (data.status.toLowerCase() === status1.value.toLowerCase()) {
            return data;
        }
    })
    let data = JSON.stringify(result);
    if (result.length === 0) {
        data = JSON.stringify([]);
    }
   
    localStorage.setItem("data", data);
    localStorage.setItem('olddata', JSON.stringify(TaskDataArr));
    SaveInfo();
    DisplayInfo();
}

