import React, { useState } from "react";
import { Typography, Box, Paper } from "@mui/material";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import TaskForm from "./components/TaskForm";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ search: "", status: "all" });
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const addTask = (task) => {
    task.id = Date.now();
    // @ts-ignore
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    // @ts-ignore
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      // @ts-ignore
      tasks.map((task) =>
        // @ts-ignore
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (task) => {
    setTaskToEdit(task);
    setIsEditing(true);
  };

  const saveTask = (updatedTask) => {
    setTasks(
      // @ts-ignore
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setIsEditing(false);
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (filter.status === "all" ||
        // @ts-ignore
        (filter.status === "completed" && task.completed) ||
        // @ts-ignore
        (filter.status === "incomplete" && !task.completed)) &&
      // @ts-ignore
      task.title.toLowerCase().includes(filter.search.toLowerCase())
    );
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 600 }}>
        <Typography variant="h4" align="center" gutterBottom>
          To-Do App
        </Typography>
        <AddTask addTask={addTask} />
        <TaskFilter filter={filter} setFilter={setFilter} />
        <TaskList
          tasks={filteredTasks}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          editTask={editTask}
        />
        {isEditing && (
          <TaskForm
            open={isEditing}
            taskToEdit={taskToEdit}
            handleSave={saveTask}
            handleClose={() => setIsEditing(false)}
          />
        )}
      </Paper>
    </Box>
  );
};

export default App;
