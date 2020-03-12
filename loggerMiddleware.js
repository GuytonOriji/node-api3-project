// the three Amigas
module.exports = function logger(req, res, next) {
  // log information about the request to the console -> GET to /
  const method = req.method;
  const endpoint = req.originalUrl;
  const timeStamp = req.timeStamp;

  console.log(`${method} to ${endpoint} / ${timeStamp}`);

  next(); // moves the request to the next middleware
};
