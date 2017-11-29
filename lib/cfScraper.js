const rq = require('request-promise');

function getProblemInfo (problemID) {
  return new Promise(function(resolve, reject) {
    const regexStr = '^(\\d+)([A-Z])$';
    const regex = new RegExp(regexStr);
    const match = regex.exec(problemID);
    if (!match) return reject(Error(`Invalid problemID. Failed regex ${regexStr}`));

    const contestID = match[1];
    const problemIndex = match[2];

    // TODO: Retrieves all problems. Need to make it more efficient.
    rq.get({
      url: `http://codeforces.com/api/problemset.problems`,
      json: true,
    }).then(function(res) {
      if (res.status !== 'OK') throw Error('CF API status was not OK');
      const problem = res.result.problems.find((problem) => {
        return problem.contestId.toString() === contestID && problem.index === problemIndex;
      });
      const info = {
        platform: 'cf',
        problemID,
        title: problem.name,
        link: `http://codeforces.com/problemset/problem/${contestID}/${problemIndex}`,
      };
      return resolve(info);
    }).catch(reject);
  });
};

module.exports = {
  getProblemInfo,
};
