const BuscarCtrl = {};
const Dato = require("../models/Buscar");
const puppeteer = require('puppeteer');
require("dotenv").config();

BuscarCtrl.BuscarComponente = async (req, res) => {
    try {
        const { nombreC } = req.body;

        // Lógica para el primer sitio web
        const browser1 = await puppeteer.launch({
            args: [ 
                '--no-sandbox',
                 '--disable-setuid-sandbox',
             '--disable-dev-shm-usage',
             '--disable-accelerated-2d-canvas',
             '--disable-gpu'
            ],
            executablePath: process.env.NODE_ENV === 'production1'
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer.executablePath(),
        });
        const page1 = await browser1.newPage();

        await page1.goto('https://www.electronicoscaldas.com/es/', { waitUntil: 'domcontentloaded', timeout: 60000 });

        await page1.type('#search_query_top', nombreC);
        await page1.click('button');

        await page1.waitForSelector('#center_column');

        const componentPrice1 = await page1.$eval('span.price.product-price', el => el.textContent);
        const componentLink1 = await page1.$eval('#product_list > li.ajax_block_product.col-xs-12.col-sm-6.col-md-4.first-in-line.first-item-of-tablet-line.first-item-of-mobile-line > div > div.left-block > div > a', el => el.href);
        
        console.log(`El precio más barato para ${nombreC} (Sitio 1) es: ${componentPrice1}`);
        console.log(`El link del componente para ${nombreC} (Sitio 1) es: ${componentLink1}`);

        await browser1.close();


        // Lógica para el segundo sitio web
        const browser2 = await puppeteer.launch({ 
            args: [ 
                '--no-sandbox',
                '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
            ],
            executablePath: process.env.NODE_ENV === 'production2'
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer.executablePath(),
         });
        const page2 = await browser2.newPage();

        await page2.goto('https://www.bigtronica.com/');
        await page2.type('#search_query_top', nombreC);

        await page2.evaluate(() => {
            document.querySelector('button[type="submit"]').click();
        });

        await page2.waitForSelector('#center_column');
        await page2.waitForSelector('#center_column > ul > li.ajax_block_product.first-in-line.first-item-of-tablet-line.first-item-of-mobile-line.col-xs-12 > div > div > div.center-block.col-xs-4.col-sm-7.col-md-4 > h5 > a');

        const componentPrice2 = await page2.$eval('span.price.product-price', el => el.textContent);
        const componentLink2 = await page2.$eval('#center_column > ul > li.ajax_block_product.first-in-line.first-item-of-tablet-line.first-item-of-mobile-line.col-xs-12 > div > div > div.center-block.col-xs-4.col-sm-7.col-md-4 > h5 > a', el => el.href);
        
        console.log(`El precio más barato para ${nombreC} (Sitio 2) es: ${componentPrice2}`);
        console.log(`El link del componente para ${nombreC} (Sitio 2) es: ${componentLink2}`);

        await browser2.close();

        // Verificar si se encontraron resultados en ambos sitios
        const resultadosSitio1 = componentPrice1 && componentLink1;
        const resultadosSitio2 = componentPrice2 && componentLink2;

        // Renderizar según los resultados
        if (resultadosSitio1 || resultadosSitio2) {
            res.render('principal/Componentes', {resultadosSitio1,
                resultadosSitio2,
                componentPrice1,
                componentLink1,
                componentPrice2,
                componentLink2
            });
        } else {
            res.render('principal/Componentes', { resultadosNulos: true });
        }

    } catch (error) {
        console.error('Error al buscar componentes:', error);
        res.redirect('/');
    }
};

module.exports = BuscarCtrl;
