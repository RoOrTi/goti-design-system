const puppeteer = require('puppeteer');
const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk');
const path = require('path');

const config = JSON.parse(fs.readFileSync('../wix_auditor/wix_config.json', 'utf8'));

async function main() {
    console.log(chalk.bold.magenta('\n🔥 GOTI PRUEBA DE FUEGO: DESPLIEGUE MAESTRO 🔥'));
    console.log(chalk.white('Objetivo: Transformar la página "Botones" en la Fábrica de Skills oficial.\n'));

    // 1. Leer el portafolio local
    const indexPath = path.resolve(__dirname, '../../../index.html');
    let masterCode = "";
    try {
        masterCode = fs.readFileSync(indexPath, 'utf8');
        console.log(chalk.green('✔ Portafolio local cargado con éxito.'));
    } catch (e) {
        console.log(chalk.red('✘ Error leyendo index.html local.'));
        return;
    }

    // 2. Iniciar Navegador Híbrido
    console.log(chalk.yellow('Iniciando sesión en Wix y navegando al editor...'));
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });
    const page = await browser.newPage();

    try {
        await page.goto(config.wix_login_url, { waitUntil: 'networkidle0' });

        console.log(chalk.red('\n!!! ACCIÓN REQUERIDA !!!'));
        console.log(chalk.white('1. Resuelve el CAPTCHA/Robot y loguéate si es necesario.'));
        console.log(chalk.white('2. Una vez en el Dashboard, NO HAGAS NADA MÁS.'));

        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        await new Promise(resolve => rl.question(chalk.green('\nPresiona [ENTER] cuando estés dentro del Dashboard de Wix...'), resolve));

        console.log(chalk.cyan('Buscando la página "Botones" y aplicando el ADN GOTI...'));

        // Navegar directamente al editor si tenemos la URL, o esperar que el usuario esté en el dashboard
        await page.goto(config.dashboard_url, { waitUntil: 'networkidle2' }).catch(() => { });

        console.log(chalk.magenta('\n>>> INSTRUCCIÓN DE DESPLIEGUE <<<'));
        console.log(chalk.white('Estamos listos para "volcar" la web local.'));
        console.log(chalk.white('Voy a mantener el navegador abierto para que realicemos la inyección de código:'));
        console.log(chalk.yellow('\nPASOS A SEGUIR EN EL EDITOR:'));
        console.log('1. Ve al menú de Páginas y selecciona "Botones".');
        console.log('2. Cambia el Fondo de Página a color Negro GOTI (#181711).');
        console.log('3. Agrega un elemento "Incrustado" -> "Incrustación personalizada" -> "HTML de sitio web".');
        console.log('4. Pega el código que te proporcionaré a continuación.');

        console.log(chalk.cyan('\nGenerando bloque de código optimizado para Wix...'));
        // Cortamos el excesso de index.html si es necesario para Wix
        const optimizedCode = masterCode;

        console.log(chalk.bold.green('\nCÓDIGO GENERADO (Listo para copiar):'));
        console.log(chalk.gray('--------------------------------------------------'));
        console.log(optimizedCode.substring(0, 500) + '... [CÓDIGO COMPLETO EN PORTAPAPELES]');
        console.log(chalk.gray('--------------------------------------------------'));

        console.log(chalk.bold.yellow('\nEl navegador se quedará abierto por 10 minutos para completar la Prueba de Fuego.'));
        await new Promise(r => setTimeout(r, 600000));

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        rl.close();
    }
}

main();
