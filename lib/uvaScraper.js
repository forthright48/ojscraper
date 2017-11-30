const rq = require('request-promise');

function getProblemInfo (problemID) {
  return new Promise(function(resolve, reject) {
    rq.get({
      url: `http://uhunt.onlinejudge.org/api/p/num/${problemID}`,
      json: true,
    }).then(function(res) {
      const info = {
        platform: 'uva',
        problemID,
        title: res.title,
        link: `http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=18&page=show_problem&problem=${res.pid}`,
      };
      return resolve(info);
    }).catch(reject);
  });
};

module.exports = {
  getProblemInfo,
};
