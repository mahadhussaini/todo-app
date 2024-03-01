const express = require("express");
const { Sequelize } = require("sequelize");
const cors = require("cors");
const config = require("./config/config.json");
const todosController = require("./controllers/todosController");

const app = express();
const port = 3001;

const sequelize = new Sequelize(config.development);

app.use(cors());
app.use(express.json());

app.get("/todos", todosController.getAllTodos);
app.post("/todos", todosController.createTodo);
app.put("/todos/:id", todosController.updateTodoCompletion);
app.put("/todos/edit/:id", todosController.updateTodoText);
app.put("/todos/toggleImportant/:id", todosController.toggleTodoImportance);
app.put(
  "/todos/removeFromComplete/:id",
  todosController.removeTodoFromCompleted
);
app.delete("/todos/:id", todosController.deleteTodo);
app.delete("/todos", todosController.deleteAllTodos);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
    app.listen(port, () => {
      console.log(`Todo App listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
