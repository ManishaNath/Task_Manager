const express = require("express");
const app = express();
const TaskData = require("../src/tasks.json");

app.use(express.json());
const fs = require("fs");
const path = require("path");

const validator = require("../src/helpers/validator");
let port = 3000;

// GET /tasks: Retrieve all tasks.
app.get("/tasks", (req, res) => {
  return res.status(200).send(TaskData);
});

// GET /tasks/:id: Retrieve a single task by its ID.
app.get("/tasks/:id", (req, res) => {
  const taskIDpassed = req.params.id;
  const allTask = TaskData.TaskManagerArray;
  let ResultID = allTask.filter((val) => val.id == taskIDpassed);
  if (ResultID.length === 0) {
    return res.status(404).send("Task not found");
  } else {
    return res.status(200).send(ResultID);
  }
});

// POST /tasks: Create a new task.
app.post("/tasks", (req, res) => {
  let taskdetails = req.body;
  if (validator.validateTaskInfo(taskdetails, TaskData)) {
    let modifiedData = JSON.parse(JSON.stringify(TaskData));
    modifiedData.TaskManagerArray.push(taskdetails);
    let writePath = path.join(__dirname, ".", "tasks.json");
    fs.writeFileSync(writePath, JSON.stringify(modifiedData), {
      encoding: "utf-8",
      flag: "w",
    });
    console.log({ taskdetails });
    return res.status(200).send("course info added");
  } else {
    return res.status(500).send("some error in the input");
  }
});

// PUT /tasks/:id: Update an existing task by its ID.
app.put("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const { title, description, flag } = req.body;
  console.log({ taskId });
  // Input validation
  if (
    !title ||
    !description ||
    (typeof flag !== "boolean" && flag !== "true" && flag !== "false")
  ) {
    return res.status(400).json({
      error: "Invalid input. Title, description, and flag are required.",
    });
  }
  const allTask = TaskData.TaskManagerArray;
  const taskIndex = allTask.findIndex((task) => task.id === parseInt(taskId));

  if (taskIndex === -1) {
    res.status(404).json({ error: "Task not found" });
  } else {
    const updatedFlag = typeof flag === "boolean" ? flag : flag === "true";
    allTask[taskIndex] = {
      id: parseInt(taskId),
      title,
      description,
      flag: updatedFlag,
    };

    // Update the task.json file
    const writePath = path.join(__dirname, ".", "tasks.json");
    fs.writeFileSync(writePath, JSON.stringify(TaskData), {
      encoding: "utf-8",
      flag: "w",
    });
    res.json(allTask[taskIndex]);
  }
});

// DELETE /tasks/:id: Delete a task by its ID.
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id); // Convert to integer
  const allTask = TaskData.TaskManagerArray;
  const taskIndex = allTask.findIndex((task) => task.id === parseInt(taskId));
  console.log({ allTask, taskIndex });
  if (taskIndex === -1) {
    res.status(404).json({ error: "Task not found" });
  } else {
    const deletedTask = allTask.splice(taskIndex, 1);

    // Update the task.json file
    const writePath = path.join(__dirname, ".", "tasks.json");
    fs.writeFileSync(writePath, JSON.stringify(TaskData), {
      encoding: "utf-8",
      flag: "w",
    });

    // res.json("deleted task is:", deletedTask[0]);
    res.send(`Task deleted: ${JSON.stringify(deletedTask[0])}`);
  }
});

app.listen(port, (err) => {
  if (err) {
    console.log("some error encountered");
  } else {
    console.log("server running on port 3000");
  }
});
