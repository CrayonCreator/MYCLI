const simpleGit = require("simple-git");
const ora = require("ora");
const downloadGit = require('download-git-repo');
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const download = {
    downloadProject: (projectName, url) => {
        // download
        const spinner = ora("正在下载项目...").start();
        let repo = url;
        if (url.includes("github.com")) {
            // 转换格式
            repo = url.replace(/https?:\/\/github\.com\//, '');
            repo = repo.replace(/\.git$/, '');
        }

        downloadGit(repo, projectName, { clone: false }, (err) => {
            if (err) {
                spinner.fail("下载失败！");
                console.error(err);
                return;
            }
            spinner.succeed("下载成功！");
            console.log(chalk.green(`项目已下载到 ${path.resolve(process.cwd(), projectName)}`));
            console.log(chalk.green("\n安装依赖: "));
            console.log(chalk.green(`  cd ${projectName}`));
            console.log(chalk.green("  npm install\n"));
            console.log(chalk.green("启动项目: "));
            console.log(chalk.green("  npm start"));
        }
        );
    },
    gitClone: (projectName, url) => {
        // clone
        const spinner = ora("正在克隆项目...").start();
        const targetPath = path.resolve(process.cwd(), projectName);

        if (fs.existsSync(targetPath)) {
            spinner.fail("目录 ${projectName} 已存在，请使用其他名称或删除现有目录");
            return;
        }

        const git = simpleGit();
        git.clone(url, targetPath)
            .then(() => {
                spinner.succeed(`项目已成功克隆到 ${projectName} 目录`);

                // 提示
                console.log("\n安装依赖: ");
                console.log(`  cd ${projectName}`);
                console.log("  npm install\n");
                console.log("启动项目: ");
                console.log("  npm start");
            })
            .catch((err) => {
                spinner.fail("克隆失败！");
                console.error(err);
            });
    },
}

module.exports = download