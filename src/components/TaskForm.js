import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const TaskForm = ({ open, taskToEdit, handleSave, handleClose }) => {
  const [task, setTask] = useState({ ...taskToEdit });

  useEffect(() => {
    setTask(taskToEdit);
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = () => {
    handleSave(task);
    handleClose(); // Close the dialog after saving
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          label="Title"
          name="title"
          value={task.title || ""}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          required
        />
        <TextField
          margin="normal"
          label="Description"
          name="description"
          value={task.description || ""}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          multiline
          rows={4}
        />
        <TextField
          margin="normal"
          label="Priority"
          name="priority"
          value={task.priority || ""}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
