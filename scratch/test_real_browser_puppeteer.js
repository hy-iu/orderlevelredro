import puppeteer from 'puppeteer';

(async () => {
  console.log('Launching Real Headless Chrome Browser to test http://127.0.0.1:3000/...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  const consoleErrors = [];
  const pageErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.error('❌ [BROWSER CONSOLE ERROR]:', msg.text());
    }
  });

  page.on('pageerror', err => {
    pageErrors.push(err.message);
    console.error('❌ [UNCAUGHT PAGE EXCEPTION]:', err.message);
  });

  console.log('Navigating Chrome to http://127.0.0.1:3000/...');
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle0' });

  // Wait 3 seconds for initial render & DataURI loading
  await new Promise(r => setTimeout(r, 3000));

  // Perform mouse movement and clicks on the Canvas
  const canvas = await page.$('canvas');
  if (canvas) {
    const box = await canvas.boundingBox();
    if (box) {
      console.log(`Hovering mouse over Canvas at (${box.x + box.width / 2}, ${box.y + box.height / 2})...`);
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.move(box.x + box.width / 3, box.y + box.height / 3);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }
  }

  // Click legend buttons
  const buttons = await page.$$('button');
  console.log(`Clicking ${buttons.length} UI buttons / legend toggles...`);
  for (let btn of buttons) {
    try {
      await btn.click();
      await new Promise(r => setTimeout(r, 200));
    } catch (e) {}
  }

  await new Promise(r => setTimeout(r, 2000));

  console.log('\n===============================================================');
  console.log('         REAL CHROME BROWSER CONSOLE VERIFICATION SUMMARY      ');
  console.log('===============================================================');
  console.log(`Total Console Errors Reported: ${consoleErrors.length}`);
  console.log(`Total Uncaught Page Exceptions: ${pageErrors.length}`);

  await browser.close();

  if (consoleErrors.length > 0 || pageErrors.length > 0) {
    console.error('\nFAILED: Real Chrome browser reported errors!');
    process.exit(1);
  } else {
    console.log('\nSUCCESS: 100% CLEAN! Real Chrome browser ran with 0 console errors! 🎉');
    process.exit(0);
  }
})();
