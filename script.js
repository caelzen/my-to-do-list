let shoppingForm = document.querySelector('#shopping-form');
let input = document.querySelector('input');
let list = document.querySelector('#list-container');



shoppingForm.addEventListener('submit', function(e) {
	e.preventDefault();

	let task = input.value;
	let li = document.createElement('li');
	let span = document.createElement('span');
	let removeBtn = document.createElement('button');


	let id = document.querySelectorAll('#list-container li').length + 1;
	
	span.textContent = task;
	removeBtn.textContent = 'Remove';
	removeBtn.classList.add('btn-art-delete');
	

	if (task !== '') { 
		li.id = 'task' + id;
		li.appendChild(span);
		li.appendChild(removeBtn);
		list.appendChild(li);
		input.value = '';
	}
});


list.addEventListener('click', function(e) {
	let target = e.target;
	if(target.tagName === 'BUTTON') {
		target.parentElement.remove();
	}
});