import React, { useState, useEffect } from 'react';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [userNameGet, setUserNameGet] = useState("David")

    useEffect(() => {

        fetchTasks()
    }, []);

    useEffect(() => {
        updateTasksOnServer(tasks);

    }, [tasks]);

    const fetchTasks = () => {
        fetch(`https://playground.4geeks.com/apis/fake/todos/user/DavidToDo-2`)
            .then((response) => response.json())
            .then((data) => {
                setTasks(data);
            })
            .catch((error) => console.error('Error al obtener tareas:', error));
    };

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const addTask = () => {
        if (newTask.trim() === '') return;

        const newTaskObj = { id: tasks.length + 1, title: newTask };
        setTasks([...tasks, newTaskObj]);
        setNewTask('');

    };

    const deleteTask = (taskId) => {
        const filteredTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(filteredTasks);

    };

    const clearAllTasks = () => {
        setTasks([]);

    };

    const updateTasksOnServer = (newTasks) => {
        fetch(`https://playground.4geeks.com/apis/fake/todos/user/DavidToDo-2`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTasks),
        })
            .then(() => console.log('Tareas actualizadas en el servidor.'))
            .catch((error) => console.error('Error al actualizar tareas en el servidor:', error));
    };

    return (
        <div className="card mt-4" style={{ width: "18rem;" }} >
            <div className='row d-flex justify-content-center'>

                <div className='col-lg-12 d-flex justify-content-center'>
                    <h1>Todo List</h1>
                </div>
                <div className='col-lg-12 d-flex justify-content-center'>
                    <input type="text" value={newTask} onChange={handleInputChange} />
                    <button onClick={addTask}>Agregar tarea</button>
                    <button onClick={clearAllTasks}>Limpiar todas las tareas</button>
                </div>
                <div className='col-lg-12'>
                    <ul>
                        {tasks.map((task) => (
                            <li className="d-flex justify-content-around" key={task.id}>
                                {task.title}
                                <button onClick={() => deleteTask(task.id)}> <i className="fa-solid fa-trash"></i></button>
                            </li>
                        ))}
                    </ul></div>
            </div>
        </div>
    );
}

export default TodoList;

