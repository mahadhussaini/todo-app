const { Sequelize } = require("sequelize");

const getTodoModel = require("../models/todo");
const config = require("../config//config.json");

const sequelize = new Sequelize(config.development);

const Todo = getTodoModel(sequelize);

async function getAllTodos(req, res) {
  console.log("getAllTodos Function: ", Todo);
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error("Error fetching Todos", error);
    res.status(500).json({ error: "Error Fetching Todos" });
  }
}

async function createTodo(req, res) {
  try {
    const { text, important, completed } = req.body;
    const newTodo = await Todo.create({ text, important, completed });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error adding new todo:", error);
    res.status(500).json({ error: "Error adding new todo" });
  }
}

async function updateTodoCompletion(req, res) {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ error: "Todo item not found" });
    }

    todo.completed = completed;
    await todo.save();

    res.status(200).json({ message: "Todo item completed successfully" });
  } catch (error) {
    console.error("Error completing todo:", error);
    res.status(500).json({ error: "Error completing todo" });
  }
}

async function updateTodoText(req, res) {
  const id = req.params.id;
  const newText = req.body.text;

  try {
    const todoToUpdate = await Todo.findByPk(id);
    if (!todoToUpdate) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todoToUpdate.text = newText;
    await todoToUpdate.save();

    res.status(200).json(todoToUpdate);
  } catch (error) {
    console.error("Error saving edited todo:", error);
    res.status(500).json({ error: "Error saving edited todo" });
  }
}

async function toggleTodoImportance(req, res) {
  const { id } = req.params;
  const { important } = req.body;

  try {
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ error: "Todo item not found" });
    }

    todo.important = important;
    await todo.save();

    res
      .status(200)
      .json({ message: "Todo item importance toggled successfully" });
  } catch (error) {
    console.error("Error toggling importance:", error);
    res.status(500).json({ error: "Error toggling importance" });
  }
}

async function removeTodoFromCompleted(req, res) {
  const { id } = req.params;

  try {
    const removedTodo = await Todo.findByPk(id);
    if (!removedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    removedTodo.completed = false;
    await removedTodo.save();

    res.status(200).json({
      message: "Todo removed from completed and moved back to existing todos",
    });
  } catch (error) {
    console.error("Error removing todo from completed:", error);
    res.status(500).json({ error: "Error removing todo from completed" });
  }
}

async function deleteTodo(req, res) {
  const { id } = req.params;
  try {
    const result = await Todo.destroy({ where: { id } });
    if (result === 0) {
      res.status(404).json({ error: "Todo not found" });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Error deleting todo" });
  }
}

async function deleteAllTodos(req, res) {
  try {
    await Todo.destroy({ where: {} });
    res.status(200).json({ message: "All todos cleared successfully" });
  } catch (error) {
    console.error("Error clearing all todos:", error);
    res.status(500).json({ error: "Error clearing all todos" });
  }
}

module.exports = {
  getAllTodos,
  createTodo,
  updateTodoCompletion,
  updateTodoText,
  toggleTodoImportance,
  removeTodoFromCompleted,
  deleteTodo,
  deleteAllTodos,
};
