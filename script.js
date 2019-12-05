var todoList = {
  todos: [],
  displayTodos: function() {
    if (this.todos.length === 0) {
      console.log("Your todo list is empty!");
    } else {
      console.log("My todos:");
      for (var i = 0; i < this.todos.length; i++) {
        // console.log(this.todos[i].todoText);
        if (this.todos[i].completed === true) {
          console.log("(x)", this.todos[i].todoText);
        } else {
          console.log("( )", this.todos[i].todoText);
        }
      }
    }
  },

  toggleAll: function() {
    //if all true, make all false.
    //cant check if they are all false and completed at the same time. so have to split it up into 2 separate operations.
    //count the number of true ones first...then if they are all "true", then change them
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    /* for (var = i; i < totalTodos; i++){
  if(this.todos[i].completed===true){
    completedTodos++
  }
} */
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    /*  if (completedTodos === totalTodos) {
      this.todos.forEach(function(todo) {
        todo.completed = false;
      });
    } else if (completedTodos === 0) {
      this.todos.forEach(function(todo) {
        todo.completed = true;
      });
    } else {
      this.todos.forEach(function(todo) {
        todo.completed = true;
      }); */
    this.todos.forEach(function(todo) {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });
    //figure out the todoAll where it switches to the opposite
    view.displayTodos();
  },
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
    view.displayTodos();
  },
  changeTodo: function(index, todoText) {
    this.todos[index].todoText = todoText;
    view.displayTodos();
  },
  toggleCompleted: function(index) {
    //save reference
    var todo = this.todos[index];
    //changed value to false if true, true if false. change value to opposite. bang operator flips it
    todo.completed = !todo.completed;
    //change to opposite boolean
    view.displayTodos();
  },
  //method
  deleteTodo: function(start, number) {
    this.todos.splice(start, 1);
    //referencing...data exists on the object.
    view.displayTodos();
  }
};

//when not using jquery...to get an element in the HTML in javascript you do document.getElementById("button")
//this is just vanilla javascript

// var displayTodosButton = document.getElementById("displayTodosButton");

//event listener
//method for that....
//add event listener is a method. when that happens. it will run that function
// displayTodosButton.addEventListener("click", function() {
//   todoList.displayTodos();
// });

// var toggleAllButton = document.getElementById("toggleAllButton");
// toggleAllButton.addEventListener("click", function() {
//   todoList.toggleAll();
// });

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById(
      "changeTodoPositionInput"
    );
    var changeTodoTextInput = document.getElementById("changeTodoTextInput");
    todoList.changeTodo(
      changeTodoPositionInput.valueAsNumber,
      changeTodoTextInput.value
    );
    changeTodoPositionInput.value = "";
    changeTodoTextInput.value = "";
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById(
      "toggleCompletedPositionInput"
    );
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = "";
  },
  toggleAll: function() {
    todoList.toggleAll();
  }
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector("ul");
    todosUl.innerHTML = "";
    /* for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement("li");
      var todo = todoList.todos[i];
      var todoTextWithCompletion = "";
      if (todo.completed === true) {
        todoTextWithCompletion = "( x ) " + todo.todoText + " ";
      } else {
        todoTextWithCompletion = "( ) " + todo.todoText + " ";
      }
      //DOM Manipulation
      todoLi.id = i;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    } */
    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement("li");
      var todoTextWithCompletion = "";
      //this is a callback function
      if (todo.completed === true) {
        todoTextWithCompletion = "( x ) " + todo.todoText + " ";
      } else {
        todoTextWithCompletion = "( ) " + todo.todoText + " ";
      }
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector("ul");
    todosUl.addEventListener("click", function(event) {
      //get the element that was clicked on
      var elementClicked = event.target;
      //check if element clicked is a delete button
      if (elementClicked.className === "deleteButton") {
        //run handlers.deleteTodo
        //parseInt turn string and turn into number (integer)
        var positionId = parseInt(elementClicked.parentNode.id);
        handlers.deleteTodo(positionId);
      }
    });
  }
};

view.setUpEventListeners();

// todoList.addTodo("Eat Food");
// todoList.toggleCompleted(0);
// console.log(todoList.changeTodo(0, "mo"));
