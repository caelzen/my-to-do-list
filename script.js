let shoppingForm = document.querySelector('#shopping-form');
let input = document.querySelector('input');
let list = document.querySelector('#list-container');
let removeBtn = document.createElement('button');

removeBtn.textContent = 'Remove';
removeBtn.classList.add('btn-art-delete');


shoppingForm.addEventListener('submit', function(e) {
	e.preventDefault();

	let task = input.value;
	let li = document.createElement('li');
	let span = document.createElement('span');
	span.textContent = task;

	let id = document.querySelectorAll('#list-container li').length + 1;

	if (task !== '') { 
		li.id = 'task' + id;
		li.appendChild(span);
		li.appendChild(removeBtn);
		list.appendChild(li);
		input.value = '';
	}
});