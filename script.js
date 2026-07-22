let shoppingForm = document.querySelector('#shopping-form');
let input = document.querySelector('input');
let list = document.querySelector('#list-container');


shoppingForm.addEventListener('submit', function(e) {
	e.preventDefault();

	let task = input.value;
	let li = document.createElement('li');
	let span = document.createElement('span');
	span.textContent = task;

	let numberList = document.querySelectorAll('#list-container li').length + 1;


	if (task !== '') { 
		li.id = 'task' + numberList;
		li.appendChild(span);
		list.appendChild(li); 
		input.value = '';
	}
});