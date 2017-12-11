const rq = require('request-promise');
const cheerio = require('cheerio');
const _ = require('lodash');

async function getProblemInfo (problemID) {
  try {
    const regexStr = '^[A-Z0-9_]+$';
    const regex = new RegExp(regexStr);
    const match = regex.exec(problemID);
    if (!match) throw Error(`Invalid problemID. Failed regex ${regexStr}`);

    const res = await rq.get({
      url: `http://www.spoj.com/problems/${problemID}`,
      json: true,
    });

    const $ = cheerio.load(res);
    const title = $('ol.breadcrumb > li.active').text();
    if (!title) throw Error('Invalid ProblemID: Missing title');
    const info = {
      platform: 'spoj',
      problemID,
      title,
      link: `http://www.spoj.com/problems/${problemID}`,
    };
    return info;
  } catch (err) {
    throw err;
  }
};

async function getUserInfo (username) {
  try {
    const userPage = await rq.get({
      url: `http://www.spoj.com/users/${username}`,
    });
    const $ = cheerio.load(userPage);
    const solved = [];

    $('.table-condensed td a').each(function() {
      const pid = $(this).text();
      if (pid) solved.push($(this).text());
    });

    const solvedOrdered = _.orderBy(solved);

    return {
      platform: 'spoj',
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
