#! /usr/bin/env node

import inquirer from "inquirer";

let todoList: string[] = [];
let condition = true;
let main = async () => {
  while (condition) {
    let option = await inquirer.prompt([
      {
        name: "choices",
        type: "list",
        message: "select an option you want to do:",
        choices: ["Add", "Delete", "Update", "View todo list", "Exit"],
      },
    ]);
    if (option.choices === "Add") {
      await addTask();
    } else if (option.choices === "Delete") {
      await deleteTask();
    } else if (option.choices === "Update") {
      await updateTask();
    } else if (option.choices === "View todo list") {
      await viewTask();
    } else if (option.choices === "Exit") {
      condition = false;
    }
  }
};
// function to add new task in todo list

let addTask = async () => {
  let newTask = await inquirer.prompt([
    {
      name: "task",
      type: "input",
      message: "enter your new task :",
    },
  ]);
  todoList.push(newTask.task);
  console.log(`\n ${newTask.task} task added successfully in todo list`);
};
// function to view your todos list

let viewTask = () => {
  console.log("\n your todosList: \n");
  todoList.forEach((task, index) => {
    console.log(`${index + 1}: ${task}`);
  });
};
// function to delete a task from the list

let deleteTask = async () => {
       await viewTask();
  let taskIndex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: "enter the 'index no' yuou want to delete :",
    },
  ]);
  let deletedTask = todoList.splice(taskIndex.index - 1, 1);
  console.log(
    `\n ${deletedTask} this task has been deleted successfully from your todo list`
  );
};
  //function to update a task

let updateTask = async () => {
  await viewTask()
  let update_task_index = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: "Enter the `index no` you want to update:"
    },
    {
      name: "new_task",
      tpye: "input",
      message: "Now enter the new task name:",
    },
  ]);
  todoList[update_task_index.index - 1] = update_task_index.new_task;
  console.log(
    `\n task at index no.${update_task_index.index - 1} updated successfully [to view updated list click:"view todo list"]`
  )
}
main();
