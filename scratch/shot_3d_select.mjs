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

  await page.click('button[title*="浅色"]').catch(() => {});
  await new Promise(r => setTimeout(r, 500));
  await clickByText('3D 视图');
  await new Promise(r => setTimeout(r, 2500));

  // 大幅缩放到中心簇（验证点尺寸上限）
  await page.mouse.move(850, 500);
  for (let i = 0; i < 10; i++) { await page.mouse.wheel({ deltaY: -300 }); await new Promise(r => setTimeout(r, 120)); }
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: '/tmp/v4_closeup.png' });

  // 找一个可点击的点（悬停命中 tooltip 的位置）
  let hitPos = null;
  outer: for (let x = 500; x <= 1200; x += 30) {
    for (let y = 300; y <= 750; y += 30) {
      await page.mouse.move(x, y);
      await new Promise(r => setTimeout(r, 60));
      const tip = await page.evaluate(() => {
        const els = [...document.querySelectorAll('div')];
        const t = els.find(e => e.innerHTML?.includes('10^') && e.style.display === 'block');
        return t ? t.textContent : null;
      });
      if (tip) { hitPos = { x, y, tip }; break outer; }
    }
  }
  if (hitPos) {
    console.log('选中:', hitPos.tip.slice(0, 60));
    await page.mouse.click(hitPos.x, hitPos.y);
    await new Promise(r => setTimeout(r, 900));
    await page.screenshot({ path: '/tmp/v4_selected.png' });
  } else {
    console.log('未找到可点击点');
  }

  console.log('console errors:', errors.length);
  errors.slice(0, 3).forEach(e => console.log('  ❌', e.slice(0, 150)));
  await browser.close();
})();
