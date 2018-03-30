const rq = require('request-promise');
const cheerio = require('cheerio');
const _ = require('lodash');

async function getProblemInfo (problemID) {
  try {
    const regexStr = '^[a-z0-9]+_[a-z]$';
    const regex = new RegExp(regexStr);
    const match = regex.exec(problemID);
    if (!match) throw Error(`Invalid problemID. Failed regex ${regexStr}`);

    const contestId = problemID.split('_')[0];
    const res = await rq.get({
      url: `https://${contestId}.contest.atcoder.jp/tasks/${problemID}`,
    });

    const $ = cheerio.load(res);
    const title = $('h2').text().split('-').slice(1).join('').trim();
    if (!title) throw Error('Invalid ProblemID: Missing title');
    const info = {
      platform: 'poj',
      problemID,
      title,
      link: `https://${contestId}.contest.atcoder.jp/tasks/${problemID}`,
    };
    return info;
  } catch (err) {
    throw err;
  }
};

async function getUserInfo (username) {
  try {
    const userPage = await rq.get({
      url: `https://atcoder.jp/user/${username}`,
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
