'use strict';

module.exports = function validate(options){
	if(!isObject(options)){
		throw new Error('NEL must be called with an object argument.');
	}
	if(typeof(options.report_to) !== 'undefined' && typeof(options.report_to) !== 'string'){
		throw new Error('The `report_to` parameter must be a string if set.');
	}
	if(options.include_subdomains && typeof(options.include_subdomains) !== 'boolean'){
		throw new Error('The `include_subdomains` parameter must be a boolean if set.');
	}
	if(!options.max_age){
		throw new Error('The `max_age` parameter is required.');
	}
	if(typeof(options.max_age) !== 'number' || options.max_age <= 0){
		throw new Error('The `max_age` parameter must be a positive integer.');
	}
	if(options.success_fraction && (typeof(options.success_fraction) !== 'number' || options.success_fraction < 0 || options.success_fraction > 1)){
		throw new Error('The `success_fraction` parameter must be a positive integer between 0.0 and 1.0.');
	}
	if(options.failure_fraction && (typeof(options.failure_fraction) !== 'number' || options.failure_fraction < 0 || options.failure_fraction > 1)){
		throw new Error('The `failure_fraction` parameter must be a positive integer between 0.0 and 1.0.');
	}
};

function isObject(value){
	return Object.prototype.toString.call(value) === '[object Object]';
}