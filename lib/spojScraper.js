const rq = require('request-promise');
const cheerio = require('cheerio');

function getProblemInfo (problemID) {
  return new Promise(function(resolve, reject) {
    const regexStr = '^[A-Z0-9_]+$';
    const regex = new RegExp(regexStr);
    const match = regex.exec(problemID);
    if (!match) return reject(Error(`Invalid problemID. Failed regex ${regexStr}`));

    rq.get({
      url: `http://www.spoj.com/problems/${problemID}`,
      json: true,
    }).then(function(res) {
      const $ = cheerio.load(res);
      const title = $('ol.breadcrumb > li.active').text();
      if (!title) throw Error('Invalid ProblemID: Missing title');
      const info = {
        platform: 'spoj',
        problemID,
        title,
        link: `http://www.spoj.com/problems/${problemID}`,
      };
      return resolve(info);
    }).catch(reject);
  });
};

module.exports = {
  getProblemInfo,
};
