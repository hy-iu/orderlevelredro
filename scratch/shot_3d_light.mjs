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

  // 切亮色主题
  await clickByText('切换到浅色模式') || await page.click('button[title*="浅色"]');
  await new Promise(r => setTimeout(r, 800));
  // 切 3D
  await clickByText('3D 视图');
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({ path: '/tmp/shot_3d_light.png' });

  // 悬停到画面中心附近的数据点，触发读数提示
  let hovered = false;
  outer: for (let x = 600; x <= 1100; x += 40) {
    for (let y = 350; y <= 700; y += 40) {
      await page.mouse.move(x, y);
      await new Promise(r => setTimeout(r, 120));
      const tip = await page.evaluate(() => {
        const els = [...document.querySelectorAll('div')];
        const t = els.find(e => e.innerHTML?.includes('10^') && e.style.display === 'block');
        return t ? t.textContent : null;
      });
      if (tip) { console.log('tooltip:', tip.slice(0, 120)); hovered = true; break outer; }
    }
  }
  if (!hovered) console.log('tooltip: (未命中)');
  await page.screenshot({ path: '/tmp/shot_3d_hover.png' });

  console.log('console errors:', errors.length);
  errors.slice(0, 3).forEach(e => console.log('  ❌', e.slice(0, 150)));
  await browser.close();
})();
