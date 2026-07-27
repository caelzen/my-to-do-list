let shoppingForm = document.querySelector('#shopping-form');
let input = document.querySelector('input');
let list = document.querySelector('#list-container');
let taskItemsArr = [];
let idArr = [];
let id = 0;
let isLocalStorageEmpty = checkLocalStorageEmpty();
let lastID = null;

// localStorage.clear();

getTasks();
setupFormListener();
setupDeleteListener();
setupStorageListener();


function getTasks() {
	if (isLocalStorageEmpty) {  return; }

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
	if (input.value !== '') {
		generateID();
		addIDToArray();
		addTask();
		addTaskToArray();
		updateTasksStorage();
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



function generateID() {
	let lastID = getLocalStorageLastID();
	if(lastID) {id = lastID;}
	id += 1;
}

function getLocalStorageLastID() {
	let item = JSON.parse(localStorage.getItem('tasks'));
	if(item) {
		let id = item.idArr;
		let lastID = Number(id.at(-1));
		return lastID;
	}
}


function addIDToArray() {
	idArr.push(id);
}


function setupDeleteListener() {
	list.addEventListener('click', function(e) {
		let target = e.target;
		
		if(target.tagName === 'BUTTON') {
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


window.addEventListener('storage', (e) => {
	if (e.key === 'tasks') {
		console.log(e.newValue);
	}
});


window.addEventListener('updateTasks', (e) => {
	let tasks = e.detail.taskItems
});



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





// createRemoveBtn()

function createRemoveBtn() {
	let removeBtn = document.createElement('button');
	removeBtn.textContent = 'Remove';
	removeBtn.classList.add('btn-art-delete');

	return removeBtn;
} 


// Update global variables
function addTaskToArray() {
	taskItemsArr.push(input.value);
}

function updateTasksStorage() {
	localStorage.setItem('tasks', JSON.stringify({
		idArr: idArr,
		tasks: taskItemsArr
	}));
}


function setupStorageListener() {
	window.addEventListener('storage', (e) => {
		if(e.key === 'tasks') {
			let storageTasks = e.newValue;

			console.log('storageTasks: ' + storageTasks);
		}
	});
}


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