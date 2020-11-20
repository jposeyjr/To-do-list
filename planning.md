* Create a front end experience 
that allows a user to create a Task.
    -Input box with a submit button 

* When the Task is created, it should be 
stored inside of a database (SQL)

    -Post route with task_info

* Whenever a Task is created the front end should 
refresh to show all tasks that need to be completed.

    -Get route 
    -Render with append after successful post 

* Each Task should have an option to 'Complete' or 'Delete'.

    -Add delete button and a checkbox to tasks on append with data-ids 
    -Will need a div(in html already) to attach button clicks to 
    -Buttons should have a class attached to them 
    -click listeners for both 

* When a Task is complete, its visual representation should 
change on the front end. For example, the background of the task 
container could change from gray to green. The complete option should
 be  'checked off'. Each of these are accomplished in CSS, but will 
 need to hook into logic to know whether or not the task is complete.
    
    *Checked off
    -Change background of tasks container to green when done 
    -Strike through tasks as well on checked off 
    -Have a if check on front end and change css class (toggle) 
    -Add css classes in style sheet for this 
 
* Whether or not a Task is complete should also be stored in the database.

    -send a put requests when tasks is marked or unmarked complete 

* Deleting a Task should remove it both from the front end as well 
as the Database.

    -Call a delete requests sending id to server
    -Call render function to update frontend 

Keep as much of the code in own files to be able to port to react app down the road. 


node-modules 
server 
 -public
    -scripts
        -client.js
    -styles
        -style.css 
    -index.html
modules 
 -pool.js
 -config.env
routes
 -todo.js 
server.js 