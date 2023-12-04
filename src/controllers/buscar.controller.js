const BuscarCtrl = {};
const Dato = require("../models/Buscar");
const puppeteer = require('puppeteer');

BuscarCtrl.BuscarComponente = async (req, res) => {
    try {
        const { nombreC } = req.body;

        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        await page.goto('https://www.electronicoscaldas.com/es/', { waitUntil: 'domcontentloaded', timeout: 60000 });

        // Buscar el componente y hacer clic en la lupa para buscar
        await page.type('#search_query_top', nombreC);
        await page.click('button');
        
        // Esperar a que se cargue la página de resultados y ordenar por precio
        await page.waitForSelector('#center_column');


        // Extraer el precio más barato del primer resultado
        const componentPrice = await page.$eval('span.price.product-price', el => el.textContent);
        const componentLink = await page.$eval('#product_list > li.ajax_block_product.col-xs-12.col-sm-6.col-md-4.first-in-line.first-item-of-tablet-line.first-item-of-mobile-line > div > div.left-block > div > a', el => el.href);
        
        console.log(`El precio más barato para ${nombreC} es: ${componentPrice}`);
        console.log(`El link del componente para ${nombreC} es: ${componentLink}`);

        // Aquí puedes enviar los datos al cliente o renderizar la vista con los resultados.
        res.render('principal/Componentes', { componentPrice, componentLink });

        await browser.close();
    } catch (error) {
        console.error('Error al buscar componentes:', error);
        res.status(500).send('Error interno del servidor');
    }
};

module.exports = BuscarCtrl;


