
const input_Box = document.getElementById("input_box");
const input_box_btn = document.getElementById("input_box_btn")
const btn_update_text = input_box_btn.innerText;
const task_Table = document.getElementById("task_table");
const filter_task_table = document.getElementById("filter_task_table");
let taskPriority = document.getElementById("priority");
let TaskDataArr = [];
let editId = null;
localStorage.setItem("data", JSON.stringify([]));
let objStr = localStorage.getItem('data');
window.onload = () => {
    DisplayInfo();
}
if (objStr) {
    TaskDataArr = JSON.parse(objStr);
}
const AddTask = () => {
    if (input_Box.value == '') {
        alert("Task cannot be empty!");
    }
    else {
        let li = document.createElement('td');
        task_name = input_Box.value;
        let task_priority = taskPriority.value;
        if (editId != null) {
            //edit
            TaskDataArr.splice(editId, 1, { 'name': task_name, 'status': "Incomplete", 'priority': task_priority })
        } else {
            //insert
            TaskDataArr.push({ 'name': task_name, 'status': "Incomplete", 'priority': task_priority });
        }
        SaveInfo(TaskDataArr);
        DisplayInfo();
        input_box_btn.innerText = btn_update_text;
        li.innerHTML = input_Box.value;
        taskName = document.getElementById('task_name');
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
    if (checkbox.checked == true) {
        taskStatus = "Complete"
    } else {
        taskStatus = "Incomplete"
    }
    TaskDataArr.splice(id, 1, { 'name': t_name, 'status': taskStatus, 'priority': t_priority })
    SaveInfo(TaskDataArr);
    DisplayInfo();
}
//For Displaying Main Data-
const DisplayInfo = () => {
    let statement = '';
    TaskDataArr.forEach((task, i) => {
        let checkTemp = task.status == "Complete" && "checked";
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

    TaskDataArr.splice(id, 1);
    SaveInfo(TaskDataArr);
    DisplayInfo();
}
//For Editing the record
const EditInfo = (id) => {
    editId = id;
    input_Box.value = TaskDataArr[id].name;
    input_box_btn.innerText = "Save Changes"
}
// filtering by status
const FilterStatus = () => {
    let status1 = document.getElementById('statusSelect');
    const result = TaskDataArr.filter(data => {
        return data.status.toLowerCase() === status1.value.toLowerCase();
    }
    );
    localStorage.setItem("FilterData", JSON.stringify(result));
    let Filter_Data = JSON.parse(localStorage.getItem('FilterData'));
    filterDisplay(Filter_Data);
}
const filterDisplay = (data) => {
    console.log(data.length);
    if (data.length > 0) {
        document.getElementsByClassName('filter_table_class')[0].style.display = 'block';
    } else {
        document.getElementsByClassName('filter_table_class')[0].style.display = 'none';
    }
    let statement = "";
    data?.map((task, i) => {
        let checkTemp = task.status == "Complete" && "checked";
        statement += `<tr>
            <td><input type="checkbox" ${checkTemp} name="${i}" id="checkbox${i}" onchange="StatusCall(${i})"> </td>
            <td>${i + 1}</td>
            <td id="task_name">${task.name}</td>
            <td>${task.priority}</td>
            <td>${task.status}</td>
           </tr>`
    })
    filter_task_table.innerHTML = statement;
}
//Sorting on the basis of priority:
localStorage.setItem("sortFlag", "ASC");
const sortPriority = () => {
    let sortFlag = localStorage.getItem("sortFlag");
    let priorityOrder = {};
    if (sortFlag == "ASC") {
        priorityOrder = { 'easy': 0, 'medium': 1, 'hard': 2 };
        localStorage.setItem("sortFlag", "DSC");
    }
    else {
        priorityOrder = { 'easy': 2, 'medium': 1, 'hard': 0 };
        localStorage.setItem("sortFlag", "ASC");
    }
    let sortedData = TaskDataArr.sort((task1, task2) => {
        let x = priorityOrder[task1.priority];
        let y = priorityOrder[task2.priority];
        console.log(x, y);
        return ((x < y) ? -1 : ((x > y) ? 1 : 0))
    });
    localStorage.setItem('data', sortedData);
    SaveInfo();
    DisplayInfo();
    console.log(sortedData);
}



