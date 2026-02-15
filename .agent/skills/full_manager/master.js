const { spawn } = require('child_process');
const chalk = require('chalk');
const path = require('path');

console.log(chalk.bold.gold('\n============================================='));
console.log(chalk.bold.gold('   GOTI MASTER AI ADMINISTRATOR (*.*)'));
console.log(chalk.bold.gold('=============================================\n'));

async function runSkill(skillPath, scriptName) {
    return new Promise((resolve) => {
        console.log(chalk.blue(`\n[MASTER] Orchestrating Skill: ${scriptName} in ${skillPath}...`));
        const child = spawn('node', [scriptName], {
            cwd: path.resolve(__dirname, '..', skillPath),
            stdio: 'inherit',
            shell: true
        });

        child.on('close', (code) => {
            console.log(chalk.green(`[MASTER] Skill ${scriptName} finished with exit code ${code}`));
            resolve();
        });
    });
}

async function masterFlow() {
    console.log(chalk.white('Initializing full site management sequence...'));

    // 1. Audit Content
    await runSkill('wix_auditor', 'auditor.js');

    // 2. Refresh Visuals
    await runSkill('visual_designer', 'designer.js');

    console.log(chalk.bold.green('\n[SUCCESS] Goti full ecosystem is now optimized and brand-aligned.'));
}

masterFlow();
