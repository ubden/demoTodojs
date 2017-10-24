// V11
var todoList = {
	todos: [],
	addTodo: function(todoText) { 
		this.todos.push({
			todoText: todoText,
			completed: false
		});
	},
	changeTodo: function(position, todoText) {
		this.todos[position].todoText = todoText;
	},
	deleteTodo: function(position) {
		this.todos.splice(position, 1);
	},
	toggleCompleted: function(position) {
		var todo = this.todos[position];
		todo.completed = !todo.completed;
	},
	toggleAll: function() {
		var totalTodos = this.todos.length;
		var completedTodos = 0;

		this.todos.forEach(function(todo) {
			if(todo.completed === true) {
				completedTodos++;
			}
		});

		this.todos.forEach(function(todo) {
			// Case 1: if everything's true, make everything false
			if(completedTodos === totalTodos) {
				todo.completed = false;
			// Case 2: Otherwise, make everything true
			} else {
				todo.completed = true;
			}
		});
	}
};

var handlers = {
	addTodo: function() {
		var addTodoTextInput = document.getElementById('addTodoTextInput');
		todoList.addTodo(addTodoTextInput.value);
		addTodoTextInput.value = null;
		view.displayTodos();
	},
	changeTodo: function() {
		var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
		var changeTodoTextInput = document.getElementById('changeTodoTextInput');
		todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
		changeTodoPositionInput.value = null;
		changeTodoTextInput.value = null;
		view.displayTodos();
	},
	deleteTodo: function(position) {
		todoList.deleteTodo(position);
		view.displayTodos();
	},
	toggleTodo: function() {
		var toggleTodoPositionInput = document.getElementById('toggleTodoPositionInput');
		todoList.toggleCompleted(toggleTodoPositionInput.valueAsNumber);
		toggleTodoPositionInput.value = null;
		view.displayTodos();
	},
	toggleAll: function() {
		todoList.toggleAll();
		view.displayTodos();
	}
};

// V11 Requirements
// view.displayTodos should use forEach
var view = {
	displayTodos: function() {
		var todosUl = document.querySelector('ul');
		todosUl.innerHTML = '';

		todoList.todos.forEach(function(todo, position) {
			var todoLi = document.createElement('li');
			var todoTextWithCompletion = '';

			if(todo.completed === true) {
				todoTextWithCompletion = '[✔] ' + todo.todoText;
			} else {
				todoTextWithCompletion = '[ ] ' + todo.todoText;
			}

			todoLi.id = position;
			todoLi.textContent = todoTextWithCompletion;
			todoLi.appendChild(this.createDeleteButton());
			todosUl.appendChild(todoLi);
		}, this);
	},
	createDeleteButton: function() {
		var deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.className = 'deleteButton';
		return deleteButton;
	},
	setupEventListeners: function() {
		var todosUl = document.querySelector('ul');

		todosUl.addEventListener('click', function(event) {
			// Get the element that was clicked on
			var elementClicked = event.target;

			// Check if element is deleteButton
			if(elementClicked.className === 'deleteButton') {
				handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
			}
		});
	}
};

view.setupEventListeners();