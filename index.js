import { Command } from "commander";
import inquirer from "inquirer";
const program = new Command();
import fs from "fs";
import { randomBytes } from "crypto";
const fileName = "./tasks.json";
const addQuestions = [
  {
    type: "input",
    name: "Title",
    message: "add a task for your todo list",
  },
];
const updateQuestions = [
  {
    type: "input",
    name: "Query",
    message: "enter task name and new status",
  },
];
const deleteQuestions = [
  {
    type: "input",
    name: "Query",
    message: "enter task name",
  },
];
program
  .name("Task-Tracker")
  .description("CLI for Tasks Tracking")
  .version("1.0.0");
program
  .command("add")
  .alias("a")
  .action(() => {
    inquirer
      .prompt(addQuestions)
      .then((answers) => {
        answers.id = randomBytes(5).toString("hex");
        (answers.createdAt = Date.now()),
          (answers.updatedAt = Date.now()),
          (answers.status = "todo");
        if (fs.existsSync("./tasks.json")) {
          fs.readFile("./tasks.json", "utf-8", (error, fileContent) => {
            if (error) {
              console.log(error);
              process.exit();
            }
            let tasks = [];
            if (fileContent) {
              tasks = JSON.parse(fileContent) || [];
            }
            tasks.push(answers);
            fs.writeFile("./tasks.json", JSON.stringify(tasks), "utf8", () => {
              console.log(tasks);
            });
          });
        } else {
          fs.writeFile("./tasks.json", JSON.stringify(answers), "utf8", () => {
            console.log(answers);
          });
        }
      })
      .catch((error) => {
        if (error.isTtyError) {
          console.log(error);
          return;
        } else {
          // Something else went wrong
        }
      });
  });
program
  .command("update")
  .alias("u")
  .action(() => {
    inquirer
      .prompt(updateQuestions)
      .then((answers) => {
        const taskName = answers.Query.split(" ")[0];
        const newStatus = answers.Query.split(" ")[1];
        if (fs.existsSync(fileName)) {
          fs.readFile(fileName, "utf-8", (error, data) => {
            if (error) {
              console.log(error);
              process.exit();
            }
            try {
              const content = JSON.parse(data);
              const task = content.find(
                (element) => element.Title === taskName
              );
              if (task) {
                content.map((element) => {
                  if (element.Title === taskName) {
                    element.status = newStatus;
                    element.updatedAt = Date.now();
                    console.log(`${taskName} has become ${newStatus}`);
                  }
                });
                fs.writeFile(fileName, JSON.stringify(content), "utf-8", () => {
                  console.log(content);
                });
              } else {
                console.log("task not found");
              }
            } catch (error) {
              console.log("error feching tasks");
              process.exit();
            }
          });
        }
      })
      .catch((error) => {
        console.log("error ===============>", error);
      });
  });
program
  .command("delete")
  .alias("d")
  .action(() => {
    inquirer
      .prompt(deleteQuestions)
      .then((answers) => {
        const taskName = answers.Query.split(" ")[0];
        const newStatus = answers.Query.split(" ")[1];

        if (fs.existsSync(fileName)) {
          try {
            let content = JSON.parse(fs.readFileSync(fileName, "utf-8"));
            content = content.filter((element) => element.Title !== taskName);
            fs.writeFileSync(fileName, JSON.stringify(content), "utf-8");
            console.log(content);
          } catch (error) {
            console.log("Error processing tasks:", error);
            process.exit(1);
          }
        }
      })
      .catch((error) => {
        console.log("error ===============>", error);
      });
  });
program
  .command("list")
  .alias("l")
  .argument("<listType>", "add list type")
  .action((listType) => {
    if (fs.existsSync(fileName)) {
      try {
        let content = JSON.parse(fs.readFileSync(fileName, "utf-8"));

        if (listType === "all") {
          content.forEach((element) => {
            console.log(`${element.Title} ${element.status}`);
          });
        } else {
          content.forEach((element) => {
            if (element.status === listType) {
              console.log(`${element.Title} ${element.status}`);
            }
          });
        }
      } catch (error) {
        console.log("Error processing tasks:", error);
        process.exit(1);
      }
    }
  });
program.parse();
