/** Codechef Scraper */
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const ojnameMap = {
  cc: 'CodeChef',
  cf: 'CodeForces',
  gym: 'Gym',
  hdu: 'HDU',
  loj: 'LightOJ',
  poj: 'POJ',
  sgu: 'SGU',
  spoj: 'SPOJ',
  ural: 'URAL',
  uva: 'UVA',
  uvalive: 'UVALive',
};

async function getUserInfo (username, ojname) {
  const vojname = ojnameMap[ojname];
  try {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();

    await page.goto(`https://vjudge.net/user/${username}`, {waitUntil: 'networkidle2'});
    await page.reload({waitUntil: 'networkidle2'});

    const html = await page.content();
    const $ = cheerio.load(html);

    const x = $(`.oj:contains("${vojname}")`).filter(function() {
      return $(this).text() === vojname;
    });
    const solved = x.next().text().split(' ').filter((x) => x);

    await browser.close();

    return {
      platform: 'vjudge',
      ojname,
      username,
      solveCount: solved.length,
      solveList: solved,
    };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getUserInfo,
};
