import React, { useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Paper,
  Checkbox,
} from "@mui/material";
import { Delete as DeleteIcon, Star as StarIcon } from "@material-ui/icons";
import CompletedTodos from "./CompletedTodos";

const TodoApp = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Assignment",
      important: false,
      completed: false,
    },
    {
      id: 2,
      text: "Quiz",
      important: false,
      completed: false,
    },
    {
      id: 3,
      text: "Project",
      important: false,
      completed: false,
    },
    {
      id: 4,
      text: "Assessment",
      important: false,
      completed: false,
    },
    {
      id: 5,
      text: "Presentation",
      important: false,
      completed: false,
    },
  ]);

  const [completedTodos, setCompletedTodos] = useState([]);

  const [inputValue, setInputValue] = useState("");

  const [counter, setCounter] = useState(todos.length + 1);

  const handleToggleImportant = (id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, important: !todo.important } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
    setCompletedTodos((completedTodos) =>
      completedTodos.filter((todo) => todo.id !== id)
    );
  };

  const completeTodo = (id) => {
    setTodos((todos) => {
      const completedTodo = todos.find((todo) => todo.id === id);
      if (completedTodo) {
        completedTodo.completed = true;
        console.log("Moving to Completed Todos:", completedTodo);
        setCompletedTodos((completedTodos) => [
          ...completedTodos,
          completedTodo,
        ]);
        return todos.filter((todo) => todo.id !== id);
      }
      return todos;
    });
  };

  const handleRemoveFromComplete = (id) => {
    setCompletedTodos((completedTodos) =>
      completedTodos.filter((todo) => todo.id !== id)
    );

    setTodos((todos) => {
      const removedTodo = completedTodos.find((todo) => todo.id === id);
      if (removedTodo) {
        removedTodo.completed = false;
        console.log("Moving back to Existing Todos:", removedTodo);
        return [...todos, removedTodo];
      }
      return todos;
    });
  };

  const handleClearAll = () => {
    setTodos([]);
    setCompletedTodos([]);
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: "16px",
        maxWidth: "400px",
        margin: "auto",
        marginTop: "50px",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Todo App
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (inputValue !== "") {
            setTodos((todos) => [
              ...todos,
              {
                id: counter,
                text: inputValue,
                important: false,
                completed: false,
              },
            ]);
            setCounter((counter) => counter + 1);
            setInputValue("");
          }
        }}
      >
        <TextField
          type="text"
          label="Add Todo"
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "10px" }}
        >
          Add Todo
        </Button>
      </form>
      <List style={{ marginTop: "20px" }}>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <Checkbox
              checked={todo.completed}
              onChange={() => completeTodo(todo.id)}
            />
            <ListItemText primary={todo.text} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="important"
                onClick={() => handleToggleImportant(todo.id)}
              >
                <StarIcon color={todo.important ? "secondary" : "action"} />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(todo.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {completedTodos.length > 0 ? (
        <>
          <Typography variant="h6" align="center" style={{ marginTop: "20px" }}>
            Completed Todos
          </Typography>
          <CompletedTodos
            completedTodos={completedTodos}
            handleRemoveFromComplete={(id) => handleRemoveFromComplete(id)}
            handleDelete={handleDelete}
          />
        </>
      ) : null}
      {todos.length === 0 && completedTodos.length === 0 && (
        <Typography
          variant="body1"
          align="center"
          style={{ marginTop: "20px" }}
        >
          No Todos Yet
        </Typography>
      )}
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleClearAll}
        style={{ marginTop: "20px" }}
      >
        Clear All
      </Button>
    </Paper>
  );
};

export default TodoApp;
