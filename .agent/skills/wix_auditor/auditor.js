const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk');

const config = JSON.parse(fs.readFileSync('wix_config.json', 'utf8'));

async function main() {
    console.log(chalk.blue('Starting Wix Auditor & Editor...'));

    // Phase 1: Audit Live Site
    console.log(chalk.yellow('Phase 1: Auditing Live Site...'));

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(config.target_site_url, { waitUntil: 'networkidle2' });

    const content = await page.content();
    const $ = cheerio.load(content);

    const h1 = $('h1').text().trim();
    const title = $('title').text().trim();
    const metaDesc = $('meta[name="description"]').attr('content') || '';
    const bodyTextLength = $('body').text().length;

    await browser.close();

    console.log(chalk.green('Audit Complete!'));
    console.log(`- Title: ${title}`);
    console.log(`- H1: ${h1}`);
    console.log(`- Description length: ${metaDesc.length}`);
    console.log(`- Body text length: ${bodyTextLength}`);

    // Suggestions Logic
    const suggestions = [];

    if (h1.length < 5) {
        suggestions.push({
            name: 'Improve H1: Add a clear main heading (current is too short or missing).',
            value: 'edit_h1',
            details: 'Current H1 is likely missing or empty. Suggest setting it to "Goti: Educación a Distancia".'
        });
    } else if (h1.length > 60) {
        suggestions.push({
            name: 'Shorten H1: The main heading is too log for SEO.',
            value: 'edit_h1',
            details: 'Suggest shortening to focus on keywords.'
        });
    } else {
        suggestions.push({
            name: 'Optimize H1: Make it more action-oriented.',
            value: 'edit_h1',
            details: 'Suggest changing to "Aprende con Goti - Cursos Online".'
        });
    }

    if (metaDesc.length < 50) {
        suggestions.push({
            name: 'Update Meta Description: Add more detail for SEO.',
            value: 'edit_meta',
            details: 'Current description is missing or too short.'
        });
    }

    suggestions.push({
        name: 'General Content Refresh: Add a "New Section" regarding recent updates.',
        value: 'add_section',
        details: 'Add a text block about "Nuevos Cursos 2026".'
    });

    // Prompt User
    console.log('\n--- SUGGESTED ACTIONS ---');
    suggestions.forEach((s, idx) => {
        console.log(`${idx + 1}. [${s.value}] ${s.name}`);
        console.log(`   Details: ${s.details}`);
    });
    console.log(`${suggestions.length + 1}. Exit`);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const answer = await new Promise(resolve => {
        rl.question('\nSelect an action number to execute: ', resolve);
    });
    rl.close();

    const answers = answer.split(',').map(s => s.trim());
    const selectedActions = [];

    for (const val of answers) {
        const choice = parseInt(val);
        if (choice > 0 && choice <= suggestions.length) {
            selectedActions.push(suggestions[choice - 1].value);
        }
    }

    if (selectedActions.length === 0) {
        console.log('Exiting or invalid selection...');
        return;
    }

    // Phase 2: Execute Edits
    console.log(chalk.yellow(`Executing actions: ${selectedActions.join(', ')}... Launching Editor.`));
    await executeEdits(selectedActions);
}

async function executeEdits(actions) {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });
    const page = await browser.newPage();

    try {
        // Login
        await page.goto(config.wix_login_url, { waitUntil: 'networkidle0' });

        // Check if already logged in or need credentials
        if (await page.$('input[name="email"]')) {
            console.log('Logging in...');
            await page.type('input[name="email"]', config.wix_username);
            await page.keyboard.press('Enter');
            await page.waitForSelector('input[type="password"]', { visible: true });
            await page.type('input[type="password"]', config.wix_password);
            await page.keyboard.press('Enter');
            await page.waitForNavigation({ waitUntil: 'networkidle2' });
        }

        console.log(chalk.cyan('Navigating to Dashboard...'));
        // Assume login redirects to dashboard or site lists. 
        // We want to go to the Editor. 
        // Since URL structures vary, let's try to find the "Edit Site" button or go to a known editor URL pattern if possible.
        // Ideally, we scrape the "Edit Site" link from the dashboard.

        // For this demo, we'll try to go to the dashboard and ask the user to help or find the link text "Editar sitio".
        // A robust script would find the specific site ID and construct the editor URL.

        await page.goto(config.dashboard_url, { waitUntil: 'networkidle2' }).catch(e => console.log('Nav warning:', e.message));

        console.log(chalk.red('\n!!! ACTION REQUIRED !!!'));
        console.log(chalk.white('Please solve any CAPTCHA or "400 Error" in the browser window.'));

        const waitRl = readline.createInterface({ input: process.stdin, output: process.stdout });
        await new Promise(resolve => waitRl.question(chalk.green('\nPress [ENTER] when you are ready to continue with the automation...'), resolve));
        waitRl.close();

        console.log('Looking for "Editar sitio" button...');
        // Wait for dashboard to load
        await new Promise(r => setTimeout(r, 5000));

        // Attempt to find the edit button (selectors change often, text search is better)
        const editButton = await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button, a'));
            const editBtn = buttons.find(b => b.innerText.includes('Editar sitio') || b.innerText.includes('Edit Site'));
            if (editBtn) {
                editBtn.click();
                return true;
            }
            return false;
        });

        if (!editButton) {
            console.log(chalk.red('Could not auto-find "Edit Site" button. Please click it manually in the browser window.'));
            console.log('Waiting 60 seconds for manual navigation to Editor...');
            await new Promise(r => setTimeout(r, 60000));
        } else {
            console.log('Clicked Edit Site. Waiting for Editor to load...');
        }

        // Wait for Editor (it takes a while)
        await new Promise(r => setTimeout(r, 15000));

        console.log('Editor should be open. Attempting to apply changes...');

        for (const action of actions) {
            console.log(chalk.cyan(`>>> Processing sub-action: ${action}`));
            if (action === 'edit_h1') {
                console.log('Searching for main H1 in Editor canvas...');
                // Simulated interaction for PoC
            } else if (action === 'edit_meta') {
                console.log('Navigating to SEO settings / Meta Description...');
            } else if (action === 'add_section') {
                console.log('Opening "Add Element" menu for new section...');
            }
            await new Promise(r => setTimeout(r, 2000));
        }

        console.log(chalk.green('Multi-action execution simulation complete. Manual interaction ready.'));
        console.log('Browser will remain open for 5 minutes.');
        await new Promise(r => setTimeout(r, 300000));

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}

main();
