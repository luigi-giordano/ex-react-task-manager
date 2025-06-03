import { useState, useEffect } from "react";

const { VITE_API_URL } = import.meta.env;

export default function useTasks() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`${VITE_API_URL}/tasks`)
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(err => console.error(err));
    }, []);

    const addTask = (task) => {

    }

    const removeTask = (taskId) => {

    }

    const updateTask = (updatedTask) => {

    }

    return { tasks, addTask, removeTask, updateTask };
}