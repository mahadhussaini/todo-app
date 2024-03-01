import React, { useState, useEffect } from "react";
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
import {
  Delete as DeleteIcon,
  Star as StarIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@material-ui/icons";
import CompletedTodos from "./CompletedTodos";
import axios from "axios";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/todos")
      .then((response) => {
        const { todos, completedTodos } = response.data.reduce(
          (acc, todo) => {
            if (todo.completed) {
              acc.completedTodos.push(todo);
            } else {
              acc.todos.push(todo);
            }
            return acc;
          },
          { todos: [], completedTodos: [] }
        );
        setTodos(todos);
        setCompletedTodos(completedTodos);
      })
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      axios
        .post(`http://localhost:3001/todos`, {
          text: inputValue,
          important: false,
          completed: false,
        })
        .then((response) => {
          const newTodo = response.data;
          setTodos((todos) => [...todos, newTodo]);
          setInputValue("");
        })
        .catch((error) => {
          console.error("Error adding new todo:", error);
        });
    }
  };

  const handleToggleImportant = (id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, important: !todo.important } : todo
      )
    );

    axios
      .put(`http://localhost:3001/todos/toggleImportant/${id}`, {
        important: !todos.find((todo) => todo.id === id).important,
      })
      .catch((error) => console.error("Error toggling importance:", error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/todos/${id}`)
      .then((response) => {
        console.log(response.data.message);

        setTodos((todos) => todos.filter((todo) => todo.id !== id));

        setCompletedTodos((completedTodos) =>
          completedTodos.filter((todo) => todo.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting todo:", error));
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

    axios
      .put(`http://localhost:3001/todos/${id}`, { completed: true })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error completing todo:", error);
        setTodos((todos) =>
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: false } : todo
          )
        );
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

    axios
      .put(`http://localhost:3001/todos/removeFromComplete/${id}`, {
        completed: false,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error removing from complete todo:", error);
        setTodos((todos) =>
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: true } : todo
          )
        );
      });
  };

  const handleEditStart = (id, text) => {
    setEditingTodoId(id);
    setEditingTodoText(text);
  };

  const handleEditSave = (id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingTodoText } : todo
      )
    );

    axios
      .put(`http://localhost:3001/todos/edit/${id}`, { text: editingTodoText })
      .catch((error) => console.error("Error saving edited todo:", error));

    setEditingTodoId(null);
    setEditingTodoText("");
  };

  const handleEditCancel = () => {
    setEditingTodoId(null);
    setEditingTodoText("");
  };

  const handleClearAll = () => {
    setTodos([]);
    setCompletedTodos([]);

    axios
      .delete("http://localhost:3001/todos")
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error clearing all todos:", error);
      });
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
      <form onSubmit={handleAddTodo}>
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
            {editingTodoId === todo.id ? (
              <>
                <TextField
                  type="text"
                  label="Edit Todo"
                  variant="outlined"
                  fullWidth
                  value={editingTodoText}
                  onChange={(e) => setEditingTodoText(e.target.value)}
                />
                <IconButton
                  aria-label="save"
                  onClick={() => handleEditSave(todo.id)}
                >
                  <SaveIcon />
                </IconButton>
                <IconButton
                  aria-label="cancel"
                  onClick={() => handleEditCancel()}
                >
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <>
                <ListItemText primary={todo.text} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEditStart(todo.id, todo.text)}
                  >
                    <EditIcon />
                  </IconButton>
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
              </>
            )}
          </ListItem>
        ))}
      </List>

      {completedTodos.length > 0 ? (
        <CompletedTodos
          completedTodos={completedTodos}
          handleRemoveFromComplete={(id) => handleRemoveFromComplete(id)}
          handleDelete={handleDelete}
        />
      ) : null}

      {todos.length === 0 && completedTodos.length === 0 && (
        <Typography
          variant="body1"
          align="center"
          style={{ marginTop: "20px" }}
        >
          No todos yet.
        </Typography>
      )}

      <Button
        variant="contained"
        color="error"
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
