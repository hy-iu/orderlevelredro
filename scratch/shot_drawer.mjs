import puppeteer from 'puppeteer-core';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', executablePath: process.env.CHROME_PATH, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000 });
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));

  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3500));

  // 在 2D 画布密集区逐点点击，直到详情抽屉出现
  const spots = [[800, 600], [760, 560], [850, 620], [700, 530], [900, 580], [820, 660]];
  for (const [x, y] of spots) {
    await page.mouse.click(x, y);
    await new Promise(r => setTimeout(r, 600));
    const drawer = await page.$('.animate-fade-in');
    if (drawer) {
      const txt = await drawer.evaluate(el => el.textContent || '');
      if (txt.includes('Data Provenance') || txt.includes('Quantified')) {
        console.log('drawer opened at click', x, y, '| has Provenance:', txt.includes('Data Provenance'));
        break;
      }
    }
  }
  await page.screenshot({ path: '/tmp/shot_drawer.png' });
  console.log('console errors:', errors.length);
  errors.slice(0, 3).forEach(e => console.log('  ❌', e.slice(0, 150)));
  await browser.close();
})();
