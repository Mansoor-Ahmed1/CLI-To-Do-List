import inquirer from "inquirer";
let to_do_tasks = [];
let condition_for_addition = true;
let condition_for_removal = true;
console.log(to_do_tasks);
let ask_to_add_task = await inquirer.prompt([
    {
        name: "ask_to_add",
        type: "confirm",
        message: "Do you want to add anything to your To-Do List?",
        default: "true",
    }
]);
if (ask_to_add_task.ask_to_add == true) {
    while (condition_for_addition) {
        let addTask = await inquirer.prompt([
            {
                name: "todo",
                type: "input",
                message: "What would you like to add in your To-Do List?",
                validate(input) {
                    if (input.trim() === "") {
                        console.log("Please Enter something.");
                        return false;
                    }
                    else {
                        return true;
                    }
                },
            },
            {
                name: "add_todo",
                type: "confirm",
                message: "Would you like to add more tasks to your To-Do List?",
                default: false
            }
        ]);
        to_do_tasks.push(addTask.todo); // adding tasks
        condition_for_addition = addTask.add_todo; // updating variable condition if user don't want to add anymore tasks
        console.log(to_do_tasks); //consolling the list with the uer's addition.
    }
}
// consolling each item line-by-line
for (let i = 0; i < to_do_tasks.length; i++) {
    console.log(to_do_tasks[i]);
}
//Removing a task from the To-Do List
let ask_to_remove_task = await inquirer.prompt([
    {
        name: "remove_item",
        type: "confirm",
        default: "false",
        message: "Would you like to delete any item from To-Do List?",
    }
]);
if (ask_to_remove_task.remove_item === true) {
    while (condition_for_removal) {
        let remove_item = await inquirer.prompt([
            {
                name: "remove_item",
                type: "list",
                choices: to_do_tasks,
                message: "Which which of the task would you like to delete from To-Do List?",
            },
            {
                name: "again_remove_item",
                type: "confirm",
                default: false,
                message: "Would you like to remove another item from the list?",
            }
        ]);
        condition_for_removal = remove_item.again_remove_item;
        to_do_tasks = to_do_tasks.filter(item => item !== remove_item.remove_item);
        console.log(to_do_tasks);
    }
}
