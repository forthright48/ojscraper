const rq = require('request-promise');
const _ = require('lodash');

let pidMap;

async function getPidMap() {
  if (pidMap) return pidMap;
  pidMap = {};
  const problemBank = await rq.get({
    url: `https://uhunt.onlinejudge.org/api/p`,
    json: true,
  });
  _.forEach(problemBank, function(p) {
    pidMap[p[0]] = p[1];
  });
  return pidMap;
}

async function getUserInfo (username) {
  try {
    const userID = await rq.get({
      url: `http://uhunt.onlinejudge.org/api/uname2uid/${username}`,
    });
    const pidMap = await getPidMap();
    const solvedBits = await rq.get({
      url: `http://uhunt.onlinejudge.org/api/solved-bits/${userID}`,
      json: true,
    });
    /** Now map the bits with problem ID */
    const solved = [];
    _.forEach(solvedBits[0].solved, function(mask, index) {
      for (let i = 0; i < 32; i++) {
        if (mask & (1 << i)) { /// This bit is on
          const pid = index * 32 + i;
          const problemID = pidMap[pid];
          if (!problemID) throw Error(`pid not found in pidMap`);
          solved.push(problemID);
        }
      }
    });

    const solvedOrdered = _.orderBy(solved).map((x) => x.toString());
    return {
      platform: 'uva',
      username,
      userID,
      solveCount: solvedOrdered.length,
      solveList: solvedOrdered,
    };
  } catch (err) {
    throw err;
  }
}

async function getProblemInfo (problemID) {
  try {
    const res = await rq.get({
      url: `http://uhunt.onlinejudge.org/api/p/num/${problemID}`,
      json: true,
    });
    const info = {
      platform: 'uva',
      problemID,
      title: res.title,
      link: `http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=18&page=show_problem&problem=${res.pid}`,
    };
    return info;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getProblemInfo,
  getUserInfo,
};
