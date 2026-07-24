let shoppingForm = document.querySelector('#shopping-form');
let input = document.querySelector('input');
let list = document.querySelector('#list-container');
let taskItemsArr = [];
let id = 0;
let isLocalStorageEmpty = checkLocalStorageEmpty();

if (!isLocalStorageEmpty) {
	let item = JSON.parse(localStorage.getItem('tasks'));
	let tasks = item.tasks;

	console.log(tasks);
}

shoppingForm.addEventListener('submit', function(e) {
	e.preventDefault();
	let isListEmpty = checkListEmpty();
	

	main();

	if (isListEmpty) {
		console.log('list is empty');
	} else {
		console.log('list not empty');
	}

});


function main() {
	if (input.value !== '') {
		generateID();
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
}



window.addEventListener('storage', (e) => {
	if (e.key === 'tasks') {
		console.log(e.newValue);
	}
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


function generateID() {
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
	localStorage.setItem('tasks', JSON.stringify({
		id: id,
		tasks: taskItemsArr
	}));
}


window.addEventListener('storage', (e) => {
	if(e.key === 'tasks') {
		let storageTasks = e.newValue;

		console.log('storageTasks: ' + storageTasks);
	}
});




function checkListEmpty() {
	if(list.children.length === 0) { return true; }
	return false;
}

function checkLocalStorageEmpty() {
	if (localStorage.length === 0) { return true; }
	return false;
}


function clearInput() {
	input.value = '';
}

function clearExistingList() {
	list.innerHTML = '';
}