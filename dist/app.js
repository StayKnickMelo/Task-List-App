const inputTask = document.getElementById('task');


const form = document.getElementById('task-form');

const inputFilter = document.getElementById('filter');

const clearBtn = document.querySelector('.clear-tasks');

const ul = document.querySelector('.collection');


ul.style.display = 'none';


form.addEventListener('submit', addTask);

document.addEventListener('DOMContentLoaded', loadFromLs);

ul.addEventListener('click', removeTaskFromUI);

clearBtn.addEventListener('click', clearAll);

inputFilter.addEventListener('input', filterTasks);

function addTask(e) {
  e.preventDefault();
  const taskToAdd = inputTask.value;

  if (taskToAdd === '') {
    showAlert('Add A Task', 'error');
  } else {

    addTaskToUI(taskToAdd);
    showAlert('Task Added', 'success');

    addToLs(taskToAdd);

    hideUl();

    

  }

  inputTask.value = '';

}


function showAlert(message, className){


  if(document.querySelector('.alert')){
    document.querySelector('.alert').remove();
  }
  const div = document.createElement('div');

  div.appendChild(document.createTextNode(message))

  div.classList = `alert ${className}`;


  const main = document.getElementById('main');

  const before = document.querySelector('.card-content');

  main.insertBefore(div, before);

  setTimeout(()=>{
    document.querySelector('.alert').remove();
  }, 2000);

}

function addToLs(item){

  let items
  if(localStorage.getItem('items') === null){
    items = []
    
  }else {
    items = JSON.parse(localStorage.getItem('items'));
  }

  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
}


function loadFromLs(){
  const tasks = JSON.parse(localStorage.getItem('items'));
  tasks.forEach(task =>{
    addTaskToUI(task);
  });

  hideUl();

}


function addTaskToUI(task){
  const li = document.createElement('li');

  li.className = 'collection-item';

  li.appendChild(document.createTextNode(task));

  const a = document.createElement('a');

  a.className = 'delete-item secondary-content';

  a.setAttribute('href', '#');

  const i = document.createElement('i');

  i.className = 'fas fa-trash-alt';

  a.appendChild(i);

  li.appendChild(a);

  ul.appendChild(li);

};


function removeTaskFromUI(e){
  if (e.target.className === 'fas fa-trash-alt'){
    e.target.parentElement.parentElement.remove();
  }

  removeFromLS(e.target.parentElement.parentElement.textContent);

  showAlert('Task Removed', 'success');

  hideUl();
  
}


function removeFromLS(taskToDelete){
  const tasks = JSON.parse(localStorage.getItem('items'));

  tasks.forEach((task, index) =>{
    if(task === taskToDelete){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('items', JSON.stringify(tasks));

  

}


function clearAll(){
  const tasks = document.querySelectorAll('.collection-item');

  tasks.forEach(task => task.remove());

  clearAllFromLS();

  showAlert('All Tasks Cleared', 'success');

  hideUl();


}


function clearAllFromLS(){
  localStorage.removeItem('items');
  
}


function filterTasks(e){

  const taskToSearc = e.target.value;
  const tasks = document.querySelectorAll('.collection-item');

  tasks.forEach(task =>{
    task.style.display = 'none';
    if(task.textContent.toLowerCase().indexOf(taskToSearc.toLowerCase()) !== -1){
      task.style.display = 'block';
    }
  })
}

function hideUl(){
  if(!ul.firstElementChild){
    ul.style.display = 'none';
  }else{
    ul.style.display = 'block';
  }
}


