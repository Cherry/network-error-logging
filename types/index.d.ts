import { Request, Response, NextFunction } from "express";

type OptionsConfig = {
	report_to?: string;
	include_subdomains?: boolean;
	max_age: number;
	success_fraction?: number;
	failure_fraction?: number;
	request_headers?: string[];
	response_headers?: string[];
};

/**
 * Validates a configuration for using the middleware. Internally, the library will call a separate
 * validate function
 *
 * @param {OptionsConfig} options The configuration object to validate.
 * @returns {function} Will throw error if invalid options argument, returns an express RequestHandler otherwise
 */
declare function networkErrorLogging(
	options: OptionsConfig
): (req: Request, res: Response, next: NextFunction) => any;
export = networkErrorLogging;
