const taskInput = document.querySelector('.input-task')
const listTasks = document.querySelector('.list-items')
const addButton = document.querySelector('.add-button')

let tasks = loadFromLocalStorage()
UpdateList()

taskInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' && taskInput.value.trim() !== '') {
    addItem()
  } else if (taskInput.value.trim() === '') {
    alert('Task cannot be empty')
  }
})
addButton.addEventListener('click', () => {
  taskInput.value.trim() !== '' ? addItem() : alert('Task cannot be empty')
})

listTasks.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-icon')) {
    e.target.parentElement.remove()
  }
})

function addItem() {
  const taskText = taskInput.value.trim()

  const taskObject = {
    text: taskText,
    completed: false,
  }
  tasks.push(taskObject)
  UpdateList()
  saveToLocalStorage()
  taskInput.value = ''
}

function UpdateList() {
  listTasks.innerHTML = ''
  tasks.map((task, index) => {
    const li = createLiItem(task)
    item = createLiItem(task, index)
    listTasks.appendChild(item)
  })
}

function createLiItem(taskText, index) {
  const itemId = `item-${index}`
  const li = document.createElement('li')
  const task = taskText.text
  li.className = 'list-item'
  li.innerHTML = `<input type="checkbox" id="${itemId}"/>
              <label class="description" for="${itemId}">${task}</label>
              <button class="delete-icon">
                <i class="fa-solid fa-trash"></i>
              </button>`

  const deleteButton = li.querySelector('.delete-icon')
  deleteButton.addEventListener('click', () => {
    deleteItem(index)
  })

  const checkbox = li.querySelector('input')
  checkbox.addEventListener('change', () => {
    tasks[index].completed = checkbox.checked
    saveToLocalStorage()
  })
  checkbox.checked = taskText.completed

  return li
}

function deleteItem(index) {
  tasks = tasks.filter((_, i) => i !== index)
  saveToLocalStorage()
  UpdateList()
}

function saveToLocalStorage() {
  const listJson = JSON.stringify(tasks)
  localStorage.setItem('tasks', listJson)
}

function loadFromLocalStorage() {
  const listJson = localStorage.getItem('tasks') || '[]'
  return JSON.parse(listJson)
}
