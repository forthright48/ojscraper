const scrappers = {
  uva: require('./lib/uvaScrapper'),
};


/**
 * Returns user information from various OJ
 * @param  {object}   options  {ojname,username}
 * @param  {Function} callback
 * @return  {callback}
 */
function ojscrapper(options, callback) {
    const {ojname, username} = options;
    if (!ojname || !username) {
      const error = new Error(
        'Need to provide both ojname and username parameter'
      );
      error.name = 'parameterMissing';
      return callback(error);
    }

    if ( !scrappers[ojname] ) {
      const error = new Error(
        'ojname not found - please refer to documenation'
      );
      error.name = 'invalidParamter';
      return callback(error);
    }
}

module.exports = ojscrapper;
