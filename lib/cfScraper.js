const rq = require('request-promise');
const _ = require('lodash');

async function getProblemInfo (problemID) {
  try {
    const regexStr = '^(\\d+)([A-Z])$';
    const regex = new RegExp(regexStr);
    const match = regex.exec(problemID);
    if (!match) throw Error(`Invalid problemID. Failed regex ${regexStr}`);

    const contestID = match[1];
    const problemIndex = match[2];

    // TODO: Retrieves all problems. Need to make it more efficient.
    const res = await rq.get({
      url: `http://codeforces.com/api/problemset.problems`,
      json: true,
    });
    if (res.status !== 'OK') throw Error('CF API status was not OK');
    const problem = res.result.problems.find((problem) => {
      return problem.contestId.toString() === contestID && problem.index === problemIndex;
    });
    if (!problem) throw Error('Invalid ProblemID: Could not find problem in CF Problem Set');
    const info = {
      platform: 'cf',
      problemID,
      title: problem.name,
      link: `http://codeforces.com/problemset/problem/${contestID}/${problemIndex}`,
    };
    return info;
  } catch (err) {
    throw err;
  }
};

async function getUserInfo (username) {
  try {
    let submissions = await rq.get({
      url: `http://codeforces.com/api/user.status?handle=${username}&from=1&count=1000000`,
      json: true,
    });
    submissions = submissions.result;
    submissions = _.filter(submissions, function(sub) {
      return sub.verdict === 'OK' && sub.testset === 'TESTS';
    });
    submissions = _.map(submissions, function(sub) {
      return {contestId: sub.problem.contestId, index: sub.problem.index};
    });
    submissions = _.orderBy(submissions, ['contestId', 'index']);
    submissions = _.map(submissions, function(sub) {
      return sub.contestId + sub.index;
    });
    submissions = _.uniq(submissions);

    return {
      platform: 'cf',
      username,
      solveCount: submissions.length,
      solveList: submissions,
    };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getProblemInfo,
  getUserInfo,
};
