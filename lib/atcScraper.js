const rq = require('request-promise');
const cheerio = require('cheerio');

async function getProblemInfo (problemID) {
  try {
    const regexStr = '^[a-z0-9_]+_[a-z]$';
    const regex = new RegExp(regexStr);
    const match = regex.exec(problemID);
    if (!match) throw Error(`Invalid problemID. Failed regex ${regexStr}`);

    const contestId = problemID.split('_').slice(0, -1).join('-');
    const res = await rq.get({
      url: `https://${contestId}.contest.atcoder.jp/tasks/${problemID}`,
    });

    const $ = cheerio.load(res);
    const title = $('h2').text().split('-').slice(1).join('').trim();
    if (!title) throw Error('Invalid ProblemID: Missing title');
    const info = {
      platform: 'atc',
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
    const userinfo = await rq.get({
      url: `http://kenkoooo.com/atcoder/atcoder-api/results?user=${username}`,
      json: true,
    });

    const ac = userinfo.filter((x) => x.result === 'AC');
    const solved = ac.map((x) => x.problem_id);
    const uniqueSolved = [...new Set(solved)];

    return {
      platform: 'atc',
      username,
      solveCount: uniqueSolved.length,
      solveList: uniqueSolved,
    };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getProblemInfo,
  getUserInfo,
};
