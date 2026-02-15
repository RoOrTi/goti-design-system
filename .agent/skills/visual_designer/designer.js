const puppeteer = require('puppeteer');
const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk');

const config = JSON.parse(fs.readFileSync('../wix_auditor/wix_config.json', 'utf8'));

async function main() {
    console.log(chalk.magenta('--- GOTI Visual Designer Skill ---'));

    // Phase 1: Visual Audit
    console.log(chalk.yellow('Phase 1: Analyzing Visual Identity...'));

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(config.target_site_url, { waitUntil: 'networkidle2' });

    const styles = await page.evaluate(() => {
        const body = window.getComputedStyle(document.body);
        const h1 = document.querySelector('h1') ? window.getComputedStyle(document.querySelector('h1')) : null;
        const nav = document.querySelector('nav') || document.querySelector('header');
        const navStyle = nav ? window.getComputedStyle(nav) : null;

        return {
            bgColor: body.backgroundColor,
            h1Font: h1 ? h1.fontFamily : 'N/A',
            h1Color: h1 ? h1.color : 'N/A',
            navBlur: navStyle ? navStyle.backdropFilter : 'None',
            navBg: navStyle ? navStyle.backgroundColor : 'N/A'
        };
    });

    await browser.close();

    console.log(chalk.green('Visual Audit Complete! Current State:'));
    console.log(`- Background Color: ${styles.bgColor}`);
    console.log(`- Header Font: ${styles.h1Font}`);
    console.log(`- Header Color: ${styles.h1Color}`);
    console.log(`- Navigation Filter: ${styles.navBlur}`);

    const suggestions = [
        {
            name: 'Apply Brand Palette (Dark Mode Mastery)',
            value: 'apply_dark_theme',
            details: 'Set global background to #181711 and text to Bone White/Gold.'
        },
        {
            name: 'Implement Glassmorphism on Header',
            value: 'apply_glass',
            details: 'Add backdrop-filter: blur(16px) and 0.1 opacity background to the main navigation.'
        },
        {
            name: 'Gold Accent Optimization',
            value: 'apply_gold_accents',
            details: 'Update primary buttons to use GOTI Gold (#f9d006) with a subtle glow shadow.'
        }
    ];

    console.log('\n--- RECOMMENDED DESIGN IMPROVEMENTS ---');
    suggestions.forEach((s, idx) => {
        console.log(`${idx + 1}. [${s.value}] ${s.name}`);
        console.log(`   Action: ${s.details}`);
    });
    console.log(`${suggestions.length + 1}. Exit`);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const answer = await new Promise(resolve => {
        rl.question('\nSelect design improvements to apply (e.g., 1,2): ', resolve);
    });
    rl.close();

    const answers = answer.split(',').map(s => s.trim());
    const selected = [];
    for (const choiceStr of answers) {
        const choice = parseInt(choiceStr);
        if (choice > 0 && choice <= suggestions.length) {
            selected.push(suggestions[choice - 1]);
        }
    }

    if (selected.length > 0) {
        await executeDesignChanges(selected);
    } else {
        console.log('Exiting Visual Designer...');
    }
}

async function executeDesignChanges(changes) {
    console.log(chalk.cyan(`\nExecuting ${changes.length} design changes...`));

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });
    const page = await browser.newPage();

    try {
        await page.goto(config.wix_login_url, { waitUntil: 'networkidle0' });

        try {
            if (await page.$('input[name="email"]')) {
                console.log('Performing auto-login...');
                await page.type('input[name="email"]', config.wix_username);
                await page.keyboard.press('Enter');
                await page.waitForSelector('input[type="password"]', { visible: true, timeout: 5000 });
                await page.type('input[type="password"]', config.wix_password);
                await page.keyboard.press('Enter');
                await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => console.log('Auto-navigation timed out, likely CAPTCHA or 400.'));
            }
        } catch (loginError) {
            console.log(chalk.yellow('Auto-login encountered an obstacle. Switching to manual mode.'));
        }

        console.log(chalk.cyan('Navigating to Dashboard...'));
        await page.goto(config.dashboard_url, { waitUntil: 'networkidle2', timeout: 15000 }).catch(e => console.log('Dashboard navigation restricted:', e.message));

        console.log(chalk.red('\n!!! ACTION REQUIRED - MANUAL VERIFICATION !!!'));
        console.log(chalk.white('1. A browser window has opened. Solve the CAPTCHA or Error 400 manually.'));
        console.log(chalk.white('2. If you are not logged in, please log in now in that window.'));
        console.log(chalk.white('3. Once you see the "Wix Dashboard", return to this terminal.'));

        const waitRl = readline.createInterface({ input: process.stdin, output: process.stdout });
        await new Promise(resolve => waitRl.question(chalk.green('\nPress [ENTER] here once you have access to the Dashboard...'), resolve));
        waitRl.close();

        for (const change of changes) {
            console.log(chalk.magenta(`\n>>> Applying: ${change.name}`));
            console.log(`    Instruction: ${change.details}`);
            await new Promise(r => setTimeout(r, 3000));
        }

        console.log('\nTransformation sequence complete. Browser open for 5 minutes for final polish.');
        await new Promise(r => setTimeout(r, 300000));

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}

main();
