/** CSAcademy Scraper */
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

async function getProblemInfo (problemID) {
  try {
    const regexStr = '^[a-z0-9_-]+$';
    const regex = new RegExp(regexStr);
    const match = regex.exec(problemID);
    if (!match) throw Error(`Invalid problemID. Failed regex ${regexStr}`);

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      // headless: false,
    });
    const page = await browser.newPage();

    await page.goto(`http://csacademy.com/contest/archive/task/${problemID}/`, {waitUntil: 'networkidle2'});

    const html = await page.content();
    const $ = cheerio.load(html);
    const title = $('h1').text();
    const info = {
      platform: 'csa',
      problemID,
      title,
      link: `http://csacademy.com/contest/archive/task/${problemID}/`,
    };
    return info;
  } catch (err) {
    throw err;
  }
};

async function getUserInfo (username) {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      // headless: false,
    });
    const page = await browser.newPage();

    await page.goto(`https://csacademy.com/user/${username}`, {waitUntil: 'networkidle2'});

    const html = await page.content();
    const $ = cheerio.load(html);
    const links = $('a').map(function() {
      return $(this).attr('href');
    }).toArray();

    const solved =
      links
      .filter((x) => x.startsWith('/contest/archive/task/'))
      .map((x) => x.split('/').slice(-1)[0]);

    return {
      platform: 'csa',
      username,
      solveCount: solved.length,
      solveList: solved,
    };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getProblemInfo,
  getUserInfo,
};
