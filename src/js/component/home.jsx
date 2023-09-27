import React, { useState, useEffect } from 'react';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [userNameGet, setUserNameGet] = useState("")

    useEffect(() => {

        updateTasksOnServer(tasks);
    }, [tasks]);

    const fetchTasks = () => {
        fetch(`https://playground.4geeks.com/apis/fake/todos/user/${userNameGet}`)
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
        fetch(`https://playground.4geeks.com/apis/fake/todos/user/${userNameGet}`, {
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
        <div>
            <h1>Todo List</h1>
            <div>
                {/* <input type="text" value={userNameGet} onChange={(e)=> setUserNameGet(e.target.value)} placeholder='escribe el usuario para obtener tasks'/>
            <button>Crear</button> hacer algo como los botones de la 161 y 162 */}
            </div>
            <div>
                <input type="text" value={newTask} onChange={handleInputChange} />
                <button onClick={addTask}>Agregar tarea</button>
                <button onClick={clearAllTasks}>Limpiar todas las tareas</button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title}
                        <button onClick={() => deleteTask(task.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;

