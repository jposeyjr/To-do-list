$(document).ready(function () {
  // Establish Click Listeners
  setupClickListeners();
  getTodo();
}); // end doc ready

function setupClickListeners() {
  $('#view-todo').on('click', '.btn-delete', deleteTodo);
  $('#view-todo').on('click', '.todo-list', checkTodo);
  $('#submit-btn').on('click', saveTodo);
}

function getTodo() {
  $.ajax({
    method: 'GET',
    url: '/todo',
  })
    .then((res) => {
      renderTodo(res);
    })
    .catch((error) => {
      console.error('error in GET', error);
    });
}

function saveTodo(event) {
  event.preventDefault();
  let newTodo = {
    task: $('#todo-input').val(),
    status: 'false',
  };
  $.ajax({
    method: 'POST',
    url: '/todo',
    data: newTodo,
  })
    .then((res) => {
      getTodo();
    })
    .catch((error) => {
      console.error('Error in POST', error);
      alert('Unable to add Todo at this time. Please try again later.');
    });
  $('#todo-input').val('');
}

function renderTodo(todos) {
  let deleteImg = `/images/delete.png`;
  $('#view-todo').empty();
  for (let i = 0; i < todos.length; i += 1) {
    let todo = todos[i];
    $('#view-todo').append(`
      <section class='todo-task' data-id='${todo.id}' data-status='${todo.status}'>
      <div class='todo-list' id='${todo.id}'>
        <p>Todo: ${todo.task}</p>
        <p>Status: ${todo.status}</p>
        <p><button class='btn-delete'><img src='${deleteImg}'></button></p>
        </div>
        </section>
    `);
    if (todo.status === 'true') {
      $(`#${todo.id}`).toggleClass('complete');
      console.log('working', todo.status);
    }
  }
}

function deleteTodo() {
  let todoId = $(this).closest('section').data('id');
  $.ajax({
    method: 'DELETE',
    url: `/todo/${todoId}`,
  })
    .then((res) => {
      getTodo();
    })
    .catch((error) => {
      console.error('Error in delete', error);
      alert('Could not delete task, please try again.');
    });
}

function checkTodo() {
  let id = $(this).closest('section').data('id');
  let taskStatus = $(this).closest('section').data('status');
  $.ajax({
    method: 'PUT',
    url: `/todo/${id}`,
    data: { taskStatus },
  })
    .then((res) => {
      getTodo();
    })
    .catch((error) => {
      console.error('Error in put', error);
    });
}
