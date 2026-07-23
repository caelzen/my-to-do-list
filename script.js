let shoppingForm = document.querySelector('#shopping-form');
let input = document.querySelector('input');
let list = document.querySelector('#list-container');
let taskItemsArr = [];
let id = 0;



shoppingForm.addEventListener('submit', function(e) {
	e.preventDefault();

	if (input.value !== '') {
		updateID();
		addTask();
		addTaskToArray();
		addTaskToStorage();
		clearInput();
	}
	

	let updateTasksEvent = new CustomEvent('updateTasks', {
		detail: {
			taskItems: taskItemsArr,
			listItems: list.children.length
		}
	});

	window.dispatchEvent(updateTasksEvent);
});

window.addEventListener('updateTasks', (e) => {
	let tasks = e.detail.taskItems
});

list.addEventListener('click', function(e) {
	let target = e.target;
	if(target.tagName === 'BUTTON') {
		target.parentElement.remove();
	}
});


function updateID() {
	id += 1;
}


function addTask() {
	let task = input.value;
	let li = document.createElement('li');
	let span = document.createElement('span');
	let removeBtn = createRemoveBtn();

	li.id = 'task' + id;
	li.appendChild(span);
	li.appendChild(removeBtn);
	list.appendChild(li);
	span.textContent = task;
}

function createRemoveBtn() {
	let removeBtn = document.createElement('button');
	removeBtn.textContent = 'Remove';
	removeBtn.classList.add('btn-art-delete');

	return removeBtn;
} 

function addTaskToArray() {
	taskItemsArr.push(input.value);
}

function addTaskToStorage() {
	localStorage.setItem('tasks', {
		id: id,
		tasks: taskItemsArr
	});
}

function clearInput() {
	input.value = '';
}