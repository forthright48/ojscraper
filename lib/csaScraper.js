const rq = require('request-promise');
const cheerio = require('cheerio');

function getProblemInfo (problemID) {
  return new Promise(function(resolve, reject) {
    const regexStr = '^[a-z0-9_-]+$';
    const regex = new RegExp(regexStr);
    const match = regex.exec(problemID);
    if (!match) return reject(Error(`Invalid problemID. Failed regex ${regexStr}`));

    // TODO: Not working because csacademy is a javascript oriented website
    rq.get({
      url: `http://csacademy.com/contest/archive/task/${problemID}/`,
      json: true,
    }).then(function(res) {
      const $ = cheerio.load(res);
      const title = $('h1').text();
      const info = {
        platform: 'csa',
        problemID,
        title,
        link: `http://csacademy.com/contest/archive/task/${problemID}/`,
      };
      return resolve(info);
    }).catch(reject);
  });
};

module.exports = {
  getProblemInfo,
};
