const rq = require('request-promise');
const cheerio = require('cheerio');
const _ = require('lodash');

async function getProblemInfo (problemID) {
  try {
    const regexStr = '^\\d{4}$';
    const regex = new RegExp(regexStr);
    const match = regex.exec(problemID);
    if (!match) throw Error(`Invalid problemID. Failed regex ${regexStr}`);

    const res = await rq.get({
      url: `http://acm.hdu.edu.cn/showproblem.php?pid=${problemID}`,
    });

    const $ = cheerio.load(res);
    const title = $('h1').text();
    if (!title) throw Error('Invalid ProblemID: Missing title');
    const info = {
      platform: 'hdu',
      problemID,
      title,
      link: `http://acm.hdu.edu.cn/showproblem.php?pid=${problemID}`,
    };
    return info;
  } catch (err) {
    throw err;
  }
};

async function getUserInfo (username) {
  try {
    const userPage = await rq.get({
      url: `http://acm.hdu.edu.cn/userstatus.php?user=${username}`,
    });
    const $ = cheerio.load(userPage);

    const problemString = $('script').eq(5).html();
    const solved = _.split(problemString, ';')
      .filter((x) => x)
      .map(function(str) {
        return str.substring(2, 6);
      });
    const solvedOrdered = _.orderBy(solved);

    return {
      platform: 'hdu',
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
