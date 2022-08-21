const date = document.querySelector('#date')
const list = document.querySelector('#list')
const input = document.querySelector('#input')
const btnEnter = document.querySelector('#enter')
const test = document.querySelector('.text')

const check = "fa-check-circle"
const uncheck = "fa-circle"
const lineThrough = "line-through"
let id
let taskList


// We stablish the date with the computer date
let DATE = new Date()
date.innerHTML = DATE.toLocaleDateString('en',{weekday:'long',month:'short',day:'numeric'})


// Add a task with this structure before the end
function addTask(task, id, realize, del){

    if(del){return}
    
    // if realize is true mark check if not uncheck and in line if is true put linethrough if not empty string
    const REALIZE = realize ?check :uncheck
    const Line = realize ?lineThrough :''

    const newTask = `<li id="newTask">
                        <i class="far ${REALIZE}" id="${id}" data="realize"></i>
                        <p class="text ${Line}">${task}</p>
                        <i class="fas fa-trash de" id="${id}" data="delete"></i>
                    </li> `
    // insert the block newTask before the end of the constant LIST
    list.insertAdjacentHTML('beforeend',newTask)

}


// Change the attribute from the circle icon
function finishTask(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)

    taskList[element.id].realize = taskList[element.id].realize ?false :true
}
// Delete task when I click the delete icon
function deleteTask(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    taskList[element.id].del = true
}


// Add a task when I click on the plus icon
btnEnter.addEventListener('click', () =>{
    const task = input.value
    if(task){
        addTask(task, id, false, false)
        taskList.push({
            name: task,
            id: id,
            realize: false,
            del: false
        })
    }
    localStorage.setItem('todo',JSON.stringify(taskList))
    input.value = ""
    id++
})
// Add a task when I press enter
document.addEventListener('keyup', function(event){
    if(event.key=="Enter"){
        const task = input.value
        if(task){
            addTask(task, id, false, false)
            taskList.push({
                name: task,
                id: id,
                realize: false,
                del: false
            })
        }
        localStorage.setItem('todo',JSON.stringify(taskList))
        input.value = ""
        id++
    }
})


// We will execute a function depending on the data attribute of the element that we want to change/delete
list.addEventListener('click', function(event){
    const element = event.target
    const elementData = element.attributes.data.value
    if(elementData=='realize'){
        finishTask(element)
    }
    else if(elementData=='delete') {
        deleteTask(element)
    }
    localStorage.setItem('todo',JSON.stringify(taskList))
})


// Get items from localStorage
let tasksInfo = localStorage.getItem('todo')
if(tasksInfo){
    taskList=JSON.parse(tasksInfo)
    id = taskList.length
    reloadList(taskList)
}else{
    taskList = []
    id = 0
}


function reloadList(tasks){
    tasks.forEach(function(i){
        addTask(i.name, i.id, i.realize, i.del)
    });
}




















