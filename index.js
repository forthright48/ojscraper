const scrapers = {
  cc: require('./lib/ccScraper'),
  cf: require('./lib/cfScraper'),
  hdu: require('./lib/hduScraper'),
  loj: require('./lib/lojScraper'),
  poj: require('./lib/pojScraper'),
  spoj: require('./lib/spojScraper'),
  uva: require('./lib/uvaScraper'),
  vjudge: require('./lib/vjudgeScraper'),
  csa: require('./lib/csaScraper'),
  atc: require('./lib/atcScraper'),
};

/**
 * Returns user information from various OJ
 * @param  {object}   options  {ojname,username}
 * @return promise
 */
function getUserInfo(options) {
  return new Promise(function(resolve, reject) {
    const {ojname, username, subojname, credential} = options;
    if (!ojname || !username) {
      const error = new Error(
        'Need to provide both ojname and username parameter'
      );
      error.name = 'parameterMissing';
      return reject(error);
    }

    if (ojname === 'vjudge' && !subojname) {
      const error = new Error(
        'Need to provide subojname for vjudge'
      );
      error.name = 'parameterMissing';
      return reject(error);
    }

    if (ojname === 'loj') {
      let msg;
      if (!credential) {
        msg = 'Need to provide credential for loj';
      } else {
        const {userId, password} = credential;
        if (!userId || !password) {
          msg = 'Need to provide userId and pasword in credential';
        }
      }
      if (msg) {
        const error = new Error(msg);
        error.name = 'parameterMissing';
        return reject(error);
      }
    }

    if (!scrapers[ojname]) {
      const error = new Error(
        'ojname not found - please refer to documenation'
      );
      error.name = 'invalidParamter';
      return reject(error);
    }

    try {
      let data
      if (ojname === 'loj') {
        data = scrapers[ojname].getUserInfo(username, credential)
      } else if (ojname === 'vjudge') {
        data = scrapers[ojname].getUserInfo(username, subojname)
      } else {
        data = scrapers[ojname].getUserInfo(username)
      }
      return resolve(data)
    } catch (err) {
      return reject(err)
    }
  });
}

/**
 * Returns problem information from various OJ
 * @param  {object} options {ojname, problmID}
 * @return promise
 */
function getProblemInfo(options) {
  return new Promise(function(resolve, reject) {
    const {ojname, problemID, credential} = options;
    if (!ojname || !problemID) {
      const error = new Error(
        'Need to provide both ojname and problemID parameter'
      );
      error.name = 'parameterMissing';
      return reject(error);
    }

    if (ojname === 'loj') {
      let msg;
      if (!credential) {
        msg = 'Need to provide credential for loj';
      } else {
        const {userId, password} = credential;
        if (!userId || !password) {
          msg = 'Need to provide userId and pasword in credential';
        }
      }
      if (msg) {
        const error = new Error(msg);
        error.name = 'parameterMissing';
        return reject(error);
      }
    }

    if (!scrapers[ojname]) {
      const error = new Error(
        'ojname not found - please refer to documenation'
      );
      error.name = 'invalidParamter';
      return reject(error);
    }

    try {
      let data
      if (ojname === 'loj') {
        data = scrapers[ojname].getProblemInfo(problemID, credential)
      } else {
        data = scrapers[ojname].getProblemInfo(problemID)
      }
      return resolve(data)
    } catch(err) {
      return reject(err)
    }
  });
}

const ojscrapper = {
  getUserInfo,
  getProblemInfo,
};

module.exports = ojscrapper;
