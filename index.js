const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // Important for headful mode, but GitHub Actions will require xvfb
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // These args are often necessary in CI environments
  });
  
  const page = await browser.newPage();
  await page.goto('https://en.wikipedia.org/wiki/Main_Page');
  
  // Assuming you want to wait for and extract text from an element
  const extractedText = await page.evaluate(() => {
    const content = document.querySelector('#mp-upper, #mp-lower');
    return content ? content.innerText : '';
  });

  console.log(extractedText);

  await browser.close();
})();
