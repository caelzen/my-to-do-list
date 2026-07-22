let shoppingForm = document.querySelector('#shopping-form');
let input = document.querySelector('input');
let list = document.querySelector('#list-container');


shoppingForm.addEventListener('submit', function(e) {
	e.preventDefault();
	let task = input.value;
	let li = document.createElement('li');
	li.textContent = task;

	if (task !== '') { 
		list.appendChild(li); 
		input.value = '';
	}
});