let shoppingForm = document.querySelector('#shopping-form');
let input = document.querySelector('input');
let list = document.querySelector('#list-container');
let taskItemsArr = [];
let idArr = [];
let isLocalStorageEmpty = checkLocalStorageEmpty();
let lastID = null;

// localStorage.clear();
getTasks();
setupFormListener();
setupDeleteListener();
setupStorageListener();

let localStorageItems = viewLocalStorage(); 

function viewLocalStorage() {
	let item = JSON.parse(localStorage.getItem('tasks'));
	let id = item.idArr;
	let tasks = item.taskItemsArr;
	return id;
}


function getTasks() {
	if (isLocalStorageEmpty) { return; }

	let item = JSON.parse(localStorage.getItem('tasks'));
	let tasks = item.tasks;
	let id = item.idArr;
	taskItemsArr = tasks;
	idArr = id;
	let i = 0;

	// console.log(tasks);

	tasks.forEach(task => {
		let currentID = id[i];

		let li = document.createElement('li');
		let span = document.createElement('span');
		let removeBtn = createRemoveBtn();

		li.id = 'task' + currentID;
		li.appendChild(span);
		li.appendChild(removeBtn);
		list.appendChild(li);
		span.textContent = task;

		i++;
	});
}

function setupFormListener() {
	shoppingForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
	e.preventDefault();

	main();
}

function main() {
	let taskText = input.value.trim();
	if (taskText === '') { return; }
	generateID();
	saveNewTask(taskText); // Data / Storage update
	renderTaskUI(taskText); // UI Update
	clearInput();
	dispatchUpdateTasksEvent();
}


function generateID() {
	// console.log("GENERATE ID");
	// let item = JSON.parse(localStorage.getItem('tasks'));
	let id = null;

	if (idArr.length === 0) { id = 0; } 
	else { id = Number(idArr.at(-1)); }

	id += 1;

	addIDToArray(id);
	// console.log("THE ID IS: " + id);
}


function saveNewTask(taskText) {
	addTaskToArray(taskText);
	updateTasksStorage();
}


function addIDToArray(id) {
	idArr.push(id);
}

// Update global variables
function addTaskToArray(taskText) {
	taskItemsArr.push(taskText);
}


function updateTasksStorage() {
	localStorage.setItem('tasks', JSON.stringify({
		idArr: idArr,
		tasks: taskItemsArr
	}));
}


function renderTaskUI(taskText) {
	// console.log("--renderTaskUI--");
	let li = document.createElement('li');
	let span = document.createElement('span');
	let removeBtn = createRemoveBtn();
	let id = Number(idArr.at(-1));

	li.id = 'task' + id;
	li.appendChild(span);
	li.appendChild(removeBtn);
	list.appendChild(li);
	span.textContent = taskText;
}


function dispatchUpdateTasksEvent() {
	let updateTasksEvent = new CustomEvent('updateTasks', {
		detail: {
			taskItems: taskItemsArr,
			listItems: list.children.length
		}
	});

	window.dispatchEvent(updateTasksEvent);
}

window.addEventListener('updateTasks', (e) => {
	let tasks = e.detail.taskItems
	console.log("DISPATCH TASKS: " + tasks);
});




function getLocalStorageLastID() {
	let item = JSON.parse(localStorage.getItem('tasks'));
	console.log('ENTERED STORAGE');
	if (!item) {
		console.log('NO ITEMS' + item);
		return 0;
	}

	let id = item.idArr;
	let result = id[id.length - 1];
	console.log('HAS ITEMS: ' + id[2]);
	return result;
}

function setupDeleteListener() {
	list.addEventListener('click', function (e) {
		let target = e.target;

		if (target.tagName === 'BUTTON') {
			let parent = target.parentElement;
			let parentID = parent.id;
			let currID = parentID.slice(4)

			deleteTaskFromLocalStorage(currID);
			parent.remove();
		}
	});
}

function deleteTaskFromLocalStorage(currID) {
	let currVal = Number(currID);
	let ids = getIDsFromLocalStorage();
	let index = ids.indexOf(currVal);
	idArr.splice(index, 1)
	taskItemsArr.splice(index, 1);
	updateTasksStorage();
	// console.log("CURRENT ID: " + currVal);
	// console.log("THE INDEX IS: " + index);
	// console.log("IDs: " + ids);
}

function getIDsFromLocalStorage() {
	let item = JSON.parse(localStorage.getItem('tasks'));
	let newIDArr = item.idArr;
	return newIDArr;
}



function createRemoveBtn() {
	let removeBtn = document.createElement('button');
	removeBtn.textContent = 'Remove';
	removeBtn.classList.add('btn-art-delete');

	return removeBtn;
}





function setupStorageListener() {
	window.addEventListener('storage', (e) => {
		if (e.key === 'tasks') {
			let storageTasks = e.newValue;
		}
	});
}

function checkListEmpty() {
	if (list.children.length === 0) { return true; }
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