const scrapers = {
  uva: require('./lib/uvaScraper'),
};

/**
 * Returns user information from various OJ
 * @param  {object}   options  {ojname,username}
 */
function ojscrapper(options) {
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
    return resolve(scrapers[ojname](username));
  });
}

module.exports = ojscrapper;
