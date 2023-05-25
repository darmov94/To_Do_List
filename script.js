// Zmienne
let todoInput; // miejsce do wpisywania tresci
let errorInfo; // informacja o blednych danych lub braku wpisanych danych
let addBtn; // przycisk odpowiadajacy za dodanie zadania
let ulList; //lista zadan
let popup; //okno edycji tresci zadania
let popupInfo; //informacja pomocnicza w razie braku danych
let todoToEdit; //edytowane zadanie
let popupInput; //miejsce edytowania tresci zadania
let popupAddBtn; //przycisk zatwierdzajacy edycje
let popupCancelBtn; //przycisk anulujacy edycje

//funkcje
const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input');
	errorInfo = document.querySelector('.error-info');
	addBtn = document.querySelector('.btn-add');
	ulList = document.querySelector('.todolist ul');
	popup = document.querySelector('.popup');
	popupInfo = document.querySelector('.popup-info');
	popupAddBtn = document.querySelector('.accept');
	popupCancelBtn = document.querySelector('.cancel');
	popupInput = document.querySelector('.popup-input');
};

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTask);
	ulList.addEventListener('click', checkClick);
	popupCancelBtn.addEventListener('click', closePopup);
	popupAddBtn.addEventListener('click', editText);
	todoInput.addEventListener('keyup', checkEnterKey);
};

const addNewTask = () => {
	if (todoInput.value !== '') {
		const newTodo = document.createElement('li');
		newTodo.textContent = todoInput.value;
		console.log(todoInput.value);
		ulList.append(newTodo);

		newTools(newTodo);

		todoInput.value = '';
		errorInfo.textContent = '';
	} else {
		errorInfo.textContent = 'Wpisz treść zadania!';
	}
};

const newTools = (task) => {
	const tools = document.createElement('div');
	tools.classList.add('tools');
	task.append(tools);

	const completeBtn = document.createElement('button');
	completeBtn.classList.add('complete');
	completeBtn.innerHTML = '<i class="fas fa-check"></i>';

	const editBtn = document.createElement('button');
	editBtn.classList.add('edit');
	editBtn.textContent = 'EDYTUJ';

	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('delete');
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

	tools.append(completeBtn, editBtn, deleteBtn);
};

const checkClick = (e) => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed');
		e.target.classList.toggle('completed');
	} else if (e.target.matches('.edit')) {
		editTodo(e);
	} else if (e.target.matches('.delete')) {
		deleteTodo(e);
	}
};
const editTodo = (e) => {
	todoToEdit = e.target.closest('li');
	popupInput.value = todoToEdit.firstChild.textContent;
	popup.style.display = 'flex';
};

const closePopup = () => {
	popup.style.display = 'none';
	popupInfo.textContent = '';
};

const editText = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value;
		closePopup();
		popupInfo.textContent = '';
	} else {
		popupInfo.textContent = 'Wpisz treść zadania!';
	}
};

const deleteTodo = (e) => {
	e.target.closest('li').remove();
	closePopup();
	const allLi = ulList.querySelectorAll('li');
	if (allLi.length === 0) {
		errorInfo.textContent = 'Brak zadań na liście.';
	}
};
const checkEnterKey = (e) => {
	if (e.key === 'Enter') {
		addNewTask();
	}
};


document.addEventListener('DOMContentLoaded', main);

// DarkMode

const body = document.querySelector('body');
const light = document.querySelector('.toggle .fa-sun');
const dark = document.querySelector('.toggle .fa-moon');
const toggle = document.querySelector('#toggle');

toggle.addEventListener('change', () => {
	body.classList.toggle('dark');
	light.className =
		light.className == 'fa-solid fa-sun'
			? 'fa-solid fa-sun'
			: 'fa-solid fa-sun';
	dark.className =
		dark.className == 'fa-sharp fa-solid fa-moon'
			? 'fa-sharp fa-solid fa-moon'
			: 'fa-sharp fa-solid fa-moon';
});
