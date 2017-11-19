function getUserInfo (username) {
  return new Promise(function(resolve, reject) {
    return resolve('It works');
  });
};

function getProblemInfo (probemID) {
  return new Promise(function(resolve, reject) {
    return resolve('It works');
  });
};

module.exports = {
  getUserInfo,
  getProblemInfo,
};
