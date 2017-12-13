const scrapers = {
  cc: require('./lib/ccScraper'),
  cf: require('./lib/cfScraper'),
  hdu: require('./lib/hduScraper'),
  poj: require('./lib/pojScraper'),
  spoj: require('./lib/spojScraper'),
  uva: require('./lib/uvaScraper'),
  // csa: require('./lib/csaScraper'),
};

/**
 * Returns user information from various OJ
 * @param  {object}   options  {ojname,username}
 * @return promise
 */
function getUserInfo(options) {
  return new Promise(function(resolve, reject) {
    const { ojname, username } = options;
    if (!ojname || !username) {
      const error = new Error(
        'Need to provide both ojname and username parameter'
      );
      error.name = 'parameterMissing';
      return reject(error);
    }

    if (!scrapers[ojname]) {
      const error = new Error(
        'ojname not found - please refer to documenation'
      );
      error.name = 'invalidParamter';
      return reject(error);
    }
    return resolve(scrapers[ojname].getUserInfo(username));
  });
}

/**
 * Returns problem information from various OJ
 * @param  {object} options {ojname, problmID}
 * @return promise
 */
function getProblemInfo(options) {
  return new Promise(function(resolve, reject) {
    const { ojname, problemID } = options;
    if (!ojname || !problemID) {
      const error = new Error(
        'Need to provide both ojname and problemID parameter'
      );
      error.name = 'parameterMissing';
      return reject(error);
    }

    if (!scrapers[ojname]) {
      const error = new Error(
        'ojname not found - please refer to documenation'
      );
      error.name = 'invalidParamter';
      return reject(error);
    }
    return resolve(scrapers[ojname].getProblemInfo(problemID));
  });
}

const ojscrapper = {
  getUserInfo,
  getProblemInfo,
};

module.exports = ojscrapper;
