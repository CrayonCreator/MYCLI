const { default: inquirer } = require("inquirer");
const download = require("./download")
const chalk = require("chalk")

const mycommander = (program) => {
    program
        .command("create <project-name>")
        .alias("c")
        .description("Create a new project")
        .action((projectName) => {
            // 执行下载项目的逻辑
            inquirer.prompt([
                {
                    type: "list",
                    name: "mode",
                    message: "请选择方式",
                    choices: [
                        { name: "clone", value: "clone" },
                        { name: "download", value: "download" },
                    ],
                },
                {
                    type:"input",
                    name:"url",
                    message:"请输入git地址"
                },
            ])
            .then((answers) => {
                const { mode, url } = answers;
                if (mode === "clone") {
                    console.log(chalk.green("正在使用git clone方式下载项目..."));
                    download.gitClone(projectName, url);
                } else if (mode === "download") {
                    console.log(chalk.green("正在使用download方式下载项目..."));
                    download.downloadProject(projectName, url);
                }
            })
        });
}

module.exports = mycommander;