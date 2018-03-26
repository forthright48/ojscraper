/** Codechef Scraper */
const puppeteer = require('puppeteer');
const rq = require('request-promise');
const cheerio = require('cheerio');
const _ = require('lodash');

async function getProblemInfo (problemID, credential) {
  try {
    const regexStr = '^\\d{4}$';
    const regex = new RegExp(regexStr);
    const match = regex.exec(problemID);
    if (!match) throw Error(`Invalid problemID. Failed regex ${regexStr}`);

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      // headless: false,
    });
    const page = await browser.newPage();

    await page.goto(`http://www.lightoj.com/login_main.php`);

    await page.type('#myuserid', credential.userId);
    await page.type('#mypassword', credential.password);
    await page.click('input[type="submit"]');
    await page.waitForNavigation();

    await page.goto(`http://www.lightoj.com/volume_showproblem.php?problem=${problemID}`, {
      waitUntil: 'networkidle2',
    });

    const html = await page.content();

    const $ = cheerio.load(html);
    const titleRaw = $('#problem_name').text();
    const title = titleRaw.trim().substr(7);

    // await page.waitFor(100000);
    await browser.close();

    if (!title) throw Error('Invalid ProblemID: Missing title');

    const info = {
      platform: 'loj',
      problemID,
      title,
      link: `http://www.lightoj.com/volume_showproblem.php?problem=${problemID}`,
    };
    return info;
  } catch (err) {
    throw err;
  }
};

async function getUserInfo (username, credential) {
  try {
    const regexStr = '^\\d+$';
    const regex = new RegExp(regexStr);
    const match = regex.exec(username);
    if (!match) throw Error(`Invalid username. Failed regex ${regexStr}`);

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      // headless: false,
    });
    const page = await browser.newPage();

    await page.goto(`http://www.lightoj.com/login_main.php`);

    await page.type('#myuserid', credential.userId);
    await page.type('#mypassword', credential.password);
    await page.click('input[type="submit"]');
    await page.waitForNavigation();

    await page.goto(`http://www.lightoj.com/volume_userstat.php?user_id=${username}`, {
      waitUntil: 'networkidle2',
    });

    const html = await page.content();

    const $ = cheerio.load(html);
    const solved = $('.leftTop').eq(4).parent().parent().find('a').map(function() {
      return $(this).text().trim();
    }).toArray();

    await browser.close();

    return {
      platform: 'loj',
      username,
      solveCount: solved.length,
      solveList: solved,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getUserInfo,
  getProblemInfo,
};
