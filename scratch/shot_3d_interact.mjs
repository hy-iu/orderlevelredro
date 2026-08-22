import puppeteer from 'puppeteer-core';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', executablePath: process.env.CHROME_PATH, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000 });
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));

  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3000));

  const clickByText = async (txt) => {
    for (const b of await page.$$('button')) {
      const t = await b.evaluate(el => el.textContent || '');
      if (t.includes(txt)) { await b.click(); return true; }
    }
    return false;
  };

  // 亮色主题 + 3D
  await page.click('button[title*="浅色"]').catch(() => {});
  await new Promise(r => setTimeout(r, 500));
  await clickByText('3D 视图');
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({ path: '/tmp/v3_default.png' });

  // 滚轮向中心簇缩放（缩放到光标处）
  await page.mouse.move(850, 520);
  for (let i = 0; i < 6; i++) { await page.mouse.wheel({ deltaY: -240 }); await new Promise(r => setTimeout(r, 150)); }
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: '/tmp/v3_zoomed.png' });

  // 全部标签模式
  await clickByText('全部');
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: '/tmp/v3_labels_all.png' });

  console.log('console errors:', errors.length);
  errors.slice(0, 3).forEach(e => console.log('  ❌', e.slice(0, 150)));
  await browser.close();
})();
