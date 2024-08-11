import React from "react";
import {
  Checkbox,
  IconButton,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Task = ({ task, toggleComplete, deleteTask, editTask }) => {
  return (
    <Card
      style={{
        marginBottom: "15px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
            style={{ marginRight: "16px" }}
          />
          <div>
            <Typography
              variant="h6"
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "#9e9e9e" : "#333",
                marginBottom: "4px",
              }}
            >
              {task.title}
            </Typography>
            <Typography variant="body2" style={{ color: "#666" }}>
              {task.description}
            </Typography>
            <Typography
              variant="body2"
              style={{ color: "#444", marginTop: "4px" }}
            >
              Priority: {task.priority}
            </Typography>
          </div>
        </div>
        <div>
          <IconButton
            onClick={() => editTask(task)}
            style={{ marginRight: "8px" }}
          >
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => deleteTask(task.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default Task;
