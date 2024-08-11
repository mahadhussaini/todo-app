import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const TaskFilter = ({ filter, setFilter }) => {
  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "16px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
      }}
    >
      <TextField
        label="Search"
        name="search"
        value={filter.search}
        onChange={handleChange}
        variant="outlined"
        style={{ width: "100%" }}
      />
      <FormControl variant="outlined" style={{ width: "100%" }}>
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={filter.status}
          onChange={handleChange}
          label="Status"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="incomplete">Incomplete</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default TaskFilter;
