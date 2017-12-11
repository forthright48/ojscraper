const rq = require('request-promise');
const cheerio = require('cheerio');

async function getProblemInfo (problemID) {
  try {
    const regexStr = '\\d{4}$';
    const regex = new RegExp(regexStr);
    const match = regex.exec(problemID);
    if (!match) throw Error(`Invalid problemID. Failed regex ${regexStr}`);

    const res = await rq.get({
      url: `http://acm.hdu.edu.cn/showproblem.php?pid=${problemID}`,
      json: true,
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

module.exports = {
  getProblemInfo,
};
