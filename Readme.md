# Task-Tracker

## Description

Task-Tracker is a command-line interface (CLI) application for managing tasks. You can add, update, delete, and list tasks, which are stored in a JSON file (`tasks.json`). This tool is perfect for tracking your tasks and their statuses in a simple, straightforward way.

## Features

### 1. Add a Task

- **Command:** `add` or `a`
- **Description:** Prompts the user to enter a new task's title. The task is then stored with a unique ID, created and updated timestamps, and an initial status of "todo".
- **Usage:**
  ```bash
  node <filename>.js add
  ```
  This will prompt you to add a task, which will then be saved in `tasks.json`.

### 2. Update a Task's Status

- **Command:** `update` or `u`
- **Description:** Prompts the user to enter the task name and its new status. The application finds the task in `tasks.json`, updates its status, and updates the timestamp.
- **Usage:**
  ```bash
  node <filename>.js update
  ```
  This will prompt you to enter the task name and the new status, and the task status will be updated accordingly.

### 3. Delete a Task

- **Command:** `delete` or `d`
- **Description:** Prompts the user to enter the task name. The application finds the task in `tasks.json` and removes it from the list.
- **Usage:**
  ```bash
  node <filename>.js delete
  ```
  This will prompt you to enter the task name, and the task will be deleted from `tasks.json`.

### 4. List Tasks

- **Command:** `list <listType>` or `l <listType>`
- **Description:** Lists tasks based on their status or shows all tasks. You can view tasks of a specific status (e.g., "todo", "in-progress", "done") or all tasks.
- **Usage:**
  ```bash
  node <filename>.js list <listType>
  ```
  Replace `<listType>` with `all` to see all tasks, or specify a status like `todo`, `in-progress`, or `done`.

## Requirements

- Node.js
- The `inquirer` and `commander` npm packages

## Installation

1. Clone the repository or download the project files.
2. Navigate to the project directory.
3. Run `npm install` to install the required dependencies.

## Example Usage

```bash
node <filename>.js add
node <filename>.js update
node <filename>.js delete
node <filename>.js list all
```

## Notes

- Tasks are stored in a `tasks.json` file.
- The application handles errors, such as missing files or invalid input, and provides meaningful error messages.
