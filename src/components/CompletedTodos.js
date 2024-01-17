import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
} from "@mui/material";
import { Delete as DeleteIcon } from "@material-ui/icons";

const CompletedTodos = ({ completedTodos, handleRemoveFromComplete, handleDelete }) => {
  return (
    <List style={{ marginTop: "20px" }}>
      {completedTodos.map((todo) => (
        <ListItem key={todo.id}>
          <Checkbox
            checked={todo.completed}
            onChange={() => handleRemoveFromComplete(todo.id)}
          />
          <ListItemText primary={todo.text} />
          <ListItemSecondaryAction>
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
  );
};

export default CompletedTodos;
