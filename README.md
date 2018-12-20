Network Error Logging
==============
[![npm version](https://badge.fury.io/js/network-error-logging.svg)](https://badge.fury.io/js/network-error-logging)
[![dependencies Status](https://david-dm.org/Cherry/network-error-logging/status.svg)](https://david-dm.org/Cherry/network-error-logging)
[![Build Status](https://travis-ci.org/Cherry/network-error-logging.svg?branch=master)](https://travis-ci.org/Cherry/network-error-logging)
[![Coverage Status](https://coveralls.io/repos/github/Cherry/network-error-logging/badge.svg?branch=master)](https://coveralls.io/github/Cherry/network-error-logging?branch=master)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FCherry%2Fnetwork-error-logging.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FCherry%2Fnetwork-error-logging?ref=badge_shield)

This is Express middleware to set the `NEL` HTTP response header. You can read more about it [here](https://www.w3.org/TR/network-error-logging/#nel-response-header).

To use:

```javascript
const NEL = require('network-error-logging')

// ...

app.use(NEL({
	report_to: 'endpoint-1', // REQUIRED to register. OPTIONAL if intention is to remove a previous registration. defined in the Report-To header
	max_age: 31536000, // REQUIRED. seconds
	include_subdomains: true, // OPTIONAL
	success_fraction: 0.5, // OPTIONAL. sampling rate
	failure_fraction: 0.5 // OPTIONAL. sampling rate
}))
```
For further documentation on each field, see https://www.w3.org/TR/network-error-logging/#nel-response-header.

This header is best set with a previously defined `Report-To` group. [This module](https://github.com/Cherry/report-to) is a great way to do that.

https://report-uri.com/ is a great reporting platform for monitoring CSP, NEL, etc. error logs.

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FCherry%2Fnetwork-error-logging.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FCherry%2Fnetwork-error-logging?ref=badge_large)