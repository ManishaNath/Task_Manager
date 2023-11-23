# Task Manager API

This project implements a RESTful API for managing tasks using Node.js and Express.js. It allows users to perform CRUD operations (Create, Read, Update, and Delete) on tasks. Each task has a title, description, completion status, and an optional priority level.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- npm (Node Package Manager) installed

### Installation

1. Clone the repository:

   git clone https://github.com/ManishaNath/Task_Manager_App.git


2. Navigate to the project directory:
   cd Task_Manager_app

3. Install dependencies:
   npm install
   npm install --save express

4. Navigate to the src folder:
   cd src

5. Run the application:
   node app.js

API Endpoints

Get All Tasks
Endpoint: GET /tasks
Description: Retrieve all tasks.

Get a Single Task
Endpoint: GET /tasks/:id
Description: Retrieve a single task by its ID.

Create a New Task
Endpoint: POST /tasks
Description: Create a new task.
Request Body:
title: Task title (string, required).
description: Task description (string, required).
flag: Completion status (boolean, required).

Update a Task
Endpoint: PUT /tasks/:id
Description: Update an existing task by its ID.
Request Body:
title: Updated task title (string, required).
description: Updated task description (string, required).
flag: Updated completion status (boolean, required).

Delete a Task
Endpoint: DELETE /tasks/:id
Description: Delete a task by its ID.
