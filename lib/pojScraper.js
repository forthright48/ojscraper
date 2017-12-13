const rq = require('request-promise');
const cheerio = require('cheerio');
const _ = require('lodash');

async function getProblemInfo (problemID) {
  try {
    const regexStr = '\\d{4}$';
    const regex = new RegExp(regexStr);
    const match = regex.exec(problemID);
    if (!match) throw Error(`Invalid problemID. Failed regex ${regexStr}`);

    const res = await rq.get({
      url: `http://poj.org/problem?id=${problemID}`,
    });

    const $ = cheerio.load(res);
    const title = $('.ptt').text();
    if (!title) throw Error('Invalid ProblemID: Missing title');
    const info = {
      platform: 'poj',
      problemID,
      title,
      link: `http://poj.org/problem?id=${problemID}`,
    };
    return info;
  } catch (err) {
    throw err;
  }
};

async function getUserInfo (username) {
  try {
    const userPage = await rq.get({
      url: `http://poj.org/userstatus?user_id=${username}`,
    });
    const $ = cheerio.load(userPage);

    const problemString = $('script').eq(1).html();
    const solved = problemString.split('p(').slice(2).map((x) => x.substr(0, 4));
    const solvedOrdered = _.orderBy(solved);

    return {
      platform: 'poj',
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
