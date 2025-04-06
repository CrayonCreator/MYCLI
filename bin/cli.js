#! /usr/bin/env node
const {Command} = require("commander");
const program = new Command();
const myhelp = require("../lib/core/help.js");
myhelp(program);

const mycommander = require("../lib/core/mycommander.js");
mycommander(program);
program.parse(process.argv);
