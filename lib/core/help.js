const myhelp = (program) => {
    program.version('1.0.0');
    
    program.description("一个用于管理项目的命令行工具");
    program.option("-h, --help", "显示帮助信息");
    
    return program;
}

module.exports = myhelp;