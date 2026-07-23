let shoppingForm = document.querySelector('#shopping-form');
let input = document.querySelector('input');
let list = document.querySelector('#list-container');
let taskItemsArr = [];

shoppingForm.addEventListener('submit', function(e) {
	e.preventDefault();

	if (input.value !== '') { 
		// createRemoveBtn();
		addTask();
		addTaskToArray();
		clearInput();
	}
});


list.addEventListener('click', function(e) {
	let target = e.target;
	if(target.tagName === 'BUTTON') {
		target.parentElement.remove();
	}
});



function addTask() {
	let task = input.value;
	let li = document.createElement('li');
	let span = document.createElement('span');
	let id = document.querySelectorAll('#list-container li').length + 1;
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

function clearInput() {
	input.value = '';
}