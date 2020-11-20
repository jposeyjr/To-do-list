$(document).ready(function () {
    console.log('JQ');
    // Establish Click Listeners
    setupClickListeners()
    getTodo();
}); // end doc ready

function setupClickListeners() {
    $('#view-todo').on('click', '.btn-delete', deleteTodo);
    $('#view-todo').on('click', '.btn-check', checkTodo);
    $('#addButton').on('click', saveTodo);
}

function getTodo() {
    $.ajax({
        method: 'GET',
        url: '/todo'
    }).then((res) => {
        renderTodo(res);
    }).catch((error) => {
        console.error('error in GET', error);
    });
}

function saveTodo(newTodo) {
    $.ajax({
        method: 'POST',
        url: '/todo',
        data: newTodo
    }).then((res) => {
        getTodo();
    }).catch((error) => {
        console.error('Error in POST', error);
        alert('Unable to add Todo at this time. Please try again later.');
    });
}

function renderTodo(todos) {
    $('#view-todo').empty();
    for (let i = 0; i < todos.length; i += 1) {
        let todo = todos[i];
        console.log(todo);
    }
}


function deleteTodo() {
    let todoId = $(this).closest('div').data('id');
    $.ajax({
        method: 'DELETE',
        url: `/todo/${todoId}`
    }).then((res) => {
        getTodo();
    }).catch((error) => {
        console.error('Error in delete', error);
        alert('Could not delete task, please try again.');
    })
}

function checkTodo() {
    let id = $(this).closest('div').data('id');
    let todoCheck;
    $.ajax({
        method: 'PUT',
        url: `todo/${id}`,
    }).then((res) => {
        getTodo();
    }).catch((error) => {
        console.error('Error in put', error);
    })
}