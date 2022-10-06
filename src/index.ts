import { v4 as uuidv4 } from "uuid"

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

const tasks: Task[] = loadTasks()
const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector("#new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")

tasks.forEach(addnewTask)

form?.addEventListener("submit", e => {
  e.preventDefault()
  if (input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id:uuidv4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  tasks.push(newTask)
  saveTasks()

  addnewTask(newTask)
  input.value = ""
})

function addnewTask(task: Task) {
  const item      = document.createElement("li")
  const label     = document.createElement("label")
  const checkbox  = document.createElement("input")

  item.classList.add("list-group-item")
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type   = "checkbox"
  checkbox.classList.add("form-check-input")
  checkbox.checked = task.completed

  label.append(checkbox, " ",  task.title, " - ", new Date(task.createdAt).toLocaleDateString())
  item.append(label)
  list?.append(item)
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const savedTasks = localStorage.getItem("tasks")
  if (savedTasks == null) return  []
  return JSON.parse(savedTasks)
}
