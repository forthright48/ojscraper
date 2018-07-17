/** Codechef Scraper */
const puppeteer = require('puppeteer');
const rq = require('request-promise');
const cheerio = require('cheerio');
const _ = require('lodash');

async function getProblemInfo (problemID) {
  let browser;
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      // headless: false,
    });
  } catch (err) {
    await browser.close();
    throw err;
  }

  try {
    const regexStr = '^[A-Z0-9_]+$';
    const regex = new RegExp(regexStr);
    const match = regex.exec(problemID);
    if (!match) throw Error(`Invalid problemID. Failed regex ${regexStr}`);

    const page = await browser.newPage();

    await page.goto(`https://www.codechef.com/problems/${problemID}`, {waitUntil: 'networkidle2'});

    const html = await page.content();

    const $ = cheerio.load(html);
    const titleRaw = $('.breadcrumbs').text().split('»')[2];
    const title = titleRaw.trim();

    if (!title) throw Error('Invalid ProblemID: Missing title');
    const info = {
      platform: 'cc',
      problemID,
      title,
      link: `https://www.codechef.com/problems/${problemID}`,
    };
    return info;
  } catch (err) {
    throw err;
  } finally {
    await browser.close();
  }
};

async function getUserInfo (username) {
  try {
    const userPage = await rq.get({
      url: `https://www.codechef.com/users/${username}`,
      headers: {
        'User-Agent': 'request'
      }
    });
    const $ = cheerio.load(userPage);

    const solved = $('article').first().find('a').map(function() { return $(this).text(); });
    const solvedOrdered = _.orderBy(solved);

    return {
      platform: 'cc',
      username,
      solveCount: solvedOrdered.length,
      solveList: solvedOrdered,
    };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getProblemInfo,
  getUserInfo,
};
