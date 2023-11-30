const puppeteer = require('puppeteer');

async function scrapeComponentPrice(componentName) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.electronicoscaldas.com/es/');
  
   // Buscar el componente y hacer clic en la lupa para buscar
   await page.type('#search_query_top', componentName);
   await page.click('button');
 
   // Esperar a que se cargue la página de resultados y ordenar por precio
   await page.waitForSelector('#center_column > ul > li > div > div.right-block > div.content_price > span.price.product-price');
   
   // Extraer el precio más barato del primer resultado
   const componentPrice = await page.$eval('#center_column > ul > li:nth-child(1) > div > div.right-block > div.content_price > span.price.product-price', el => el.textContent);
   const componentLink = await page.$eval('#center_column > ul > li:nth-child(1) > div > div.left-block > div > a', el => el.href);
 
   console.log(`El precio más barato para ${componentName} es: ${componentPrice}`);
   console.log(`El link del componente para ${componentName} es: ${componentLink}`)
   await browser.close();
}

module.exports = scrapeComponentPrice;


  