$(document).ready(function () {
  // Establish Click Listeners
  setupClickListeners();
  getTodo();
}); // end doc ready

function setupClickListeners() {
  $('#view-todo').on('click', '.btn-delete', deleteTodo);
  $('#view-todo').on('click', '.todo-list', function (e) {
    let id = $(this).closest('section').data('id');
    let taskStatus = $(this).closest('section').data('status');
    let target = $(e.target);
    if (target.is('p')) {
      checkTodo(id, taskStatus);
    }
  });
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
  let input = $('#todo-input').val();
  if (input.length === 0) {
    Swal.fire({
      title: 'Invalid input',
      icon: 'error',
      width: 400,
      position: 'top',
      background: '#1d3557',
      text: 'Please enter a valid todo task!',
    });
  } else {
    let newTodo = {
      task: input,
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
  }
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
        <p class='todo-change'>${todo.task}</p>
        <p class='todo-change'>Status: ${todo.status}</p>
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
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    width: 400,
    position: 'top',
    background: '#1d3557',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
  }).then((res) => {
    if (res.isConfirmed) {
      Swal.fire({
        title: 'Deleted!',
        confirmButtonText: 'Your todo task is no more!',
        position: 'top',
        background: '#1d3557',
        width: 400,
        icon: 'success',
      });
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
  });
}

function checkTodo(id, status) {
  console.log(id, status);
  $.ajax({
    method: 'PUT',
    url: `/todo/${id}`,
    data: { status },
  })
    .then((res) => {
      getTodo();
    })
    .catch((error) => {
      console.error('Error in put', error);
    });
}
