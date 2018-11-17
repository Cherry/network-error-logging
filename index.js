'use strict';
const validate = require('./lib/validate');

module.exports = function networkErrorLogging(options){
	validate(options);

	const headerValue = JSON.stringify(options);

	return function networkErrorLogging(req, res, next){
		res.setHeader('NEL', headerValue);
		return next();
	};
};