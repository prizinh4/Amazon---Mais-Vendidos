const puppeteer = require("puppeteer");

async function scraper() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.setViewport({ width: 1200, height: 900 });

    await page.goto("https://www.amazon.com.br/gp/bestsellers/");
    await page.reload();

    // esperar até que a lista ordenada (#anonCarousel1 > ol) seja carregada na página
    await page.waitForSelector('#anonCarousel1 > ol');

    // extrair os elementos li dentro da lista ordenada
    const liElements = await page.$$eval('#anonCarousel1 > ol > li', lis => lis.map(li => li.textContent.trim()));

    await browser.close();

    return liElements;
}

// chamar a função scraper e lidar com o retorno
scraper().then(liElements => {
    console.log(liElements);
}).catch(error => {
    console.error("Erro:", error);
});
