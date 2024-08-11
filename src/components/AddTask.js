import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@mui/material";

const AddTask = ({ addTask }) => {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Low",
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = () => {
    if (task.title.trim()) {
      addTask(task);
      setTask({
        title: "",
        description: "",
        priority: "Low",
        completed: false,
      });
      setOpen(false);
    } else {
      // Optionally, show an error message if the title is empty
      alert("Please enter a task title.");
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ marginBottom: 2 }}
      >
        Add Task
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            value={task.title}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={task.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            margin="dense"
            label="Priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            select
            fullWidth
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTask;
