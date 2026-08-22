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
  await page.screenshot({ path: '/tmp/shot_2d.png' });

  // 点开一个节点详情（点击画布中心附近）—— 先点 Higgs 附近无所谓，主要验证 drawer 不崩
  // 切换到 3D
  const btns = await page.$$('button');
  for (const b of btns) {
    const txt = await b.evaluate(el => el.textContent || '');
    if (txt.includes('3D 视图')) { await b.click(); break; }
  }
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: '/tmp/shot_3d_tau.png' });

  // 切换 Z 轴到温度
  const btns2 = await page.$$('button');
  for (const b of btns2) {
    const txt = await b.evaluate(el => el.textContent || '');
    if (txt.trim().includes('特征温度')) { await b.click(); break; }
  }
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({ path: '/tmp/shot_3d_t.png' });

  console.log('console errors:', errors.length);
  errors.slice(0, 5).forEach(e => console.log('  ❌', e.slice(0, 200)));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
