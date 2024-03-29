function renderTodo() {
    fetch('todos.json').then(response => response.json()).then(data => {
    data.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo')
        todoDiv.setAttribute("data-id", todo.id);

        const titleDiv = document.createElement('div');
        titleDiv.id = "todoTitle";
        titleDiv.classList.add('todoElements');
        titleDiv.textContent = "Title : " + todo.title;

        const todoBr = document.createElement('br')

        const descriptionDiv = document.createElement('div');
        descriptionDiv.id = "todoDescription";
        descriptionDiv.classList.add('todoElements');
        descriptionDiv.textContent = "Description : " + todo.description;

        const todoButtenContainerDiv = document.createElement('div');
        todoButtenContainerDiv.classList.add('todoElements');
        todoButtenContainerDiv.classList.add('todoButtonContainer');

        const completedBut = document.createElement('button');
        const obj = completedContent(todo.completed);
        completedBut.textContent = obj.content;
        completedBut.setAttribute("onclick", "updatefunc(" + todo.id + ")");
        completedBut.id = 'todocompleted';
        completedBut.classList.add('todobutton');
        completedBut.classList.add(obj.class);
        completedBut.classList.remove(obj.remove);
        completedBut.classList.remove('button-clicked');

        completedBut.addEventListener('click', function() {
            // Add 3D effect
            completedBut.classList.add('button-clicked');            
        
            // Refresh the page after a slight delay
            setTimeout(function() {
                window.location.reload();
            }, 10); // 200 milliseconds delay
        });

        const delbutton = document.createElement('button');
        delbutton.textContent = 'Delete';
        delbutton.setAttribute("onclick", "delFunc(" + todo.id + ")");
        delbutton.id = 'tododelete';
        delbutton.classList.add('todobutton');
        delbutton.classList.remove('button-clicked');
        delbutton.addEventListener('click', function() {
            // Add 3D effect
            delbutton.classList.add('button-clicked');
        
        
            // Refresh the page after a slight delay
            setTimeout(function() {
                window.location.reload();
            }, 10); // 200 milliseconds delay
        });

        var listContainer = document.getElementById("list_container");
        listContainer.appendChild(todoDiv);
        todoDiv.appendChild(titleDiv);
        todoDiv.appendChild(todoBr);
        todoDiv.appendChild(descriptionDiv);
        todoDiv.appendChild(todoButtenContainerDiv);
        todoButtenContainerDiv.appendChild(completedBut);
        todoButtenContainerDiv.appendChild(delbutton);


    })
    }).catch(error => {
        console.error('Error reading todos:', error);
    });
}

renderTodo();

function completedContent(status) {
    if(status === true) {
        return {"class": "green", "content" : "Done", "remove": "blue"}
    }
    else return {"class": "blue", "content" : "Pending", "remove": "green"};
}


function delFunc(todoID) {
    fetch(`http://localhost:3001/todos/${todoID}`, {
    method: "DELETE",
    headers: {
        "Content-type": "application/json"
    }
    }).then(callback);

};

function updatefunc(todoID) {
    fetch(`http://localhost:3001/todos/${todoID}`, {
    method: "PUT",
    headers: {
        "Content-type": "application/json"
    }
    }).then(callback);
}

function onPressAdd() {
    
    var title = document.getElementById("title").value;
    var description = document.getElementById("Description").value;

    fetch("http://localhost:3001/todos", {
        method: "POST",
        body: JSON.stringify({
        title: title,
        description: description
        }),
        headers: {
            "Content-type": "application/json"
        }
        
    }).then(function (response) {
        setTimeout(function() {
            window.location.reload();
        }, 10);
    })
}


function load() {
    fetch('todos.json').then(response =>response.json()).then(data =>console.log(data));

}

load();