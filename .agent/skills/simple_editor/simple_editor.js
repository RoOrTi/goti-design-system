const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
    const config = JSON.parse(fs.readFileSync('wix_config.json', 'utf8'));

    console.log('Launching browser...');
    const browser = await puppeteer.launch({
        headless: false, // Run in headful mode to see what's happening
        defaultViewport: null,
        args: ['--start-maximized']
    });

    const page = await browser.newPage();

    try {
        // 1. Login
        console.log('Navigating to login page...');
        await page.goto(config.wix_login_url, { waitUntil: 'networkidle2' });

        console.log('Entering credentials...');
        // Wait for the email input
        await page.waitForSelector('input[name="email"]', { visible: true });
        await page.type('input[name="email"]', config.wix_username);
        await page.keyboard.press('Enter');

        // Wait for password input (sometimes it's on a second screen or appears after email)
        await page.waitForSelector('input[type="password"]', { visible: true });
        await page.type('input[type="password"]', config.wix_password);
        await page.keyboard.press('Enter');

        console.log('Logging in...');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        // 2. Navigate to Dashboard/Editor
        console.log('Navigating to Dashboard...');
        // Check if we need to select a site or if we go straight to dashboard
        // For now, let's dump the current URL to see where we are
        console.log('Current URL:', page.url());

        // NOTE: Wix navigation can be dynamic. 
        // This is a basic login script. 
        // To edit, we would need to navigate to the specific editor URL or click "Edit Site".

        console.log('Login successful. Script finished for now.');

        // Keep browser open for manual inspection/interaction
        console.log('Script finished. Browser will remain open for 10 minutes. Press Ctrl+C in terminal to close earlier.');
        await new Promise(r => setTimeout(r, 600000));

    } catch (error) {
        console.error('Error during execution:', error);
    } finally {
        await browser.close();
    }
}

run();
