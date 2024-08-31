//Add task clicked

let inputVal=document.getElementById('new-task')
let createButton=document.getElementById('create-button')

createButton.addEventListener("click",createTask)
inputVal.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      createTask()
    }
});



function createTask(){
    let taskname=inputVal.value
    console.log(taskname)
    if(taskname.trim()===""){
        inputVal.classList.add('no-entry-error');
        inputVal.focus();
    }
    else{
        inputVal.classList.remove('no-entry-error')
        addTasktoPage(taskname)
    }
    inputVal.value=""
}


function addTasktoPage(taskname){
    let taskContainer = document.getElementsByClassName("container")[0]
    let newTaskRow= document.createElement("div")
    newTaskRow.classList.add('task')

    let newTaskRowContents=`<div class="task-desc">
          <p class="task-value">${taskname} </p>
          <input type="text" id="update" class="hidden new-value">
        </div>
        <div class="task-tools">
          <button class="delete-task">Delete</button>
          <button class="update-task">Update</button>
        </div>`
    newTaskRow.innerHTML=newTaskRowContents
    taskContainer.append(newTaskRow)

    let deleteButton = newTaskRow.querySelector('.delete-task')
    deleteButton.addEventListener("click",deleteTask)

    let updateButton = newTaskRow.querySelector('.update-task')
    updateButton.addEventListener('click',updateTask)

    
}

function deleteTask(event){
    var buttonClicked=event.target

    console.log(buttonClicked.parentElement.parentElement)
    buttonClicked.parentElement.parentElement.remove()
}
function updateTask(event){
    var updateClicked=event.target.parentElement.parentElement
    let task=updateClicked.getElementsByClassName('task-value')[0]
    //hiding the existing value
    let taskValue = task.innerHTML
    task.classList.add("hidden")

    //revealing the input
    let updateValue=updateClicked.getElementsByClassName('new-value')[0]

    updateValue.classList.remove('hidden')
    updateValue.value=taskValue
    updateValue.focus()
    
    function handleUpdate(e) {
        // Only process if 'Enter' key or 'focusout' event
        if (e.type === 'keydown' && e.key !== 'Enter') return;

        // Update the task value
        let updatedValue = updateValue.value;
        updateValue.classList.add('hidden');
        task.innerHTML = updatedValue;
        task.classList.remove("hidden");

        // Remove event listeners after update
        updateValue.removeEventListener('focusout', handleUpdate);
        updateValue.removeEventListener('keydown', handleUpdate);
    }
    updateValue.addEventListener('focusout', handleUpdate);
    updateValue.addEventListener('keydown', handleUpdate);
}


