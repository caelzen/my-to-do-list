let shoppingForm = document.querySelector('#shopping-form');
let input = document.querySelector('input');
let list = document.querySelector('#list-container');

input.value = 1;


shoppingForm.addEventListener('submit', function(e) {
	e.preventDefault();
	let task = input.value;
	let li = document.createElement('li');
	li.textContent = task;

	list.appendChild(li);
});