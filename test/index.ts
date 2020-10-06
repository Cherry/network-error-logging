import NEL from "..";
import supertest from "supertest";
import assert from "assert";
import connect from "connect";

/*
 * Please note: there are type errors all throughout this document. This is because these
 * tests were largely copied over from the JavaScript version to test the baseline
 * functionality. While the type errors exist, they do not affect the test outcomes.
 * This may effect the CI badge on GitHub, however. Honestly not sure about that
 *
 * Additionally, some of the type errors result in the lack of types installed for certain dependencies.
 * This was intentionally left out, because I did not want to overly inflate the package.json with new packages.
 * I didn't want to make any assumptions, basically. If the owner of this project decides they want to tack on
 * the additional types to remove the type errors then that's great
 */

function app(...args: any[]) {
	const app = connect();
	app.use(NEL.apply(null, args));
	app.use(function (req: any, res: any) {
		return res.end("Hello world!");
	});
	return app;
}

describe("reportTo", function () {
	it("fails when missing any options", function () {
		assert.throws(() => NEL(null), Error);
		assert.throws(() => NEL(123), Error);
		assert.throws(() => NEL("foo"), Error);
		assert.throws(() => NEL(undefined), Error);
		assert.throws(() => NEL(), Error);
	});

	it("fails when `report_to` bas a bad value", function () {
		assert.throws(
			() =>
				NEL({
					report_to: null,
				}),
			Error
		);
		assert.throws(
			() =>
				NEL({
					report_to: 123,
				}),
			Error
		);
		assert.throws(
			() =>
				NEL({
					report_to: { foo: "bar" },
				}),
			Error
		);
		assert.throws(
			() =>
				NEL({
					report_to: [],
				}),
			Error
		);
	});

	it("fails when missing `max_age`", function () {
		assert.throws(
			() =>
				NEL({
					report_to: "endpoint-1",
				}),
			Error
		);
	});

	it("fails when `max_age` bas a bad value", function () {
		assert.throws(
			() =>
				NEL({
					report_to: "endpoint-1",
					max_age: -1,
				}),
			Error
		);
	});

	it("fails when `include_subdomains` bas a bad value", function () {
		assert.throws(
			() =>
				NEL({
					report_to: "endpoint-1",
					max_age: 31536000,
					include_subdomains: -1,
				}),
			Error
		);
	});

	it("fails when `success_fraction` bas a bad value", function () {
		assert.throws(
			() =>
				NEL({
					report_to: "endpoint-1",
					max_age: 31536000,
					include_subdomains: true,
					success_fraction: -1,
				}),
			Error
		);
	});

	it("fails when `failure_fraction` bas a bad value", function () {
		assert.throws(
			() =>
				NEL({
					report_to: "endpoint-1",
					max_age: 31536000,
					include_subdomains: true,
					success_fraction: 0.5,
					failure_fraction: -1,
				}),
			Error
		);
	});

	it("fails when `request_headers` bas a bad value", function () {
		assert.throws(
			() =>
				NEL({
					report_to: "endpoint-1",
					max_age: 31536000,
					include_subdomains: true,
					request_headers: {
						foo: "bar",
					},
				}),
			Error
		);
	});

	it("fails when `request_headers` bas a bad array value", function () {
		assert.throws(
			() =>
				NEL({
					report_to: "endpoint-1",
					max_age: 31536000,
					include_subdomains: true,
					request_headers: [
						{
							foo: "bar",
						},
					],
				}),
			Error
		);
	});

	it("fails when `response_headers` bas a bad value", function () {
		assert.throws(
			() =>
				NEL({
					report_to: "endpoint-1",
					max_age: 31536000,
					include_subdomains: true,
					response_headers: {
						foo: "bar",
					},
				}),
			Error
		);
	});

	it("fails when `response_headers` bas a bad array value", function () {
		assert.throws(
			() =>
				NEL({
					report_to: "endpoint-1",
					max_age: 31536000,
					include_subdomains: true,
					response_headers: [
						{
							foo: "bar",
						},
					],
				}),
			Error
		);
	});

	it("expect valid header response", function () {
		return supertest(
			app({
				report_to: "endpoint-1",
				max_age: 31536000,
				include_subdomains: true,
				success_fraction: 0.5,
				failure_fraction: 0.1,
			})
		)
			.get("/")
			.expect(
				"NEL",
				'{"report_to":"endpoint-1","max_age":31536000,"include_subdomains":true,"success_fraction":0.5,"failure_fraction":0.1}'
			)
			.expect("Hello world!");
	});

	it("expect valid header response with request_headers and response_headers", function () {
		return supertest(
			app({
				report_to: "endpoint-1",
				max_age: 31536000,
				include_subdomains: true,
				success_fraction: 0.5,
				failure_fraction: 0.1,
				request_headers: ["If-None-Match"],
				response_headers: ["ETag"],
			})
		)
			.get("/")
			.expect(
				"NEL",
				'{"report_to":"endpoint-1","max_age":31536000,"include_subdomains":true,"success_fraction":0.5,"failure_fraction":0.1,"request_headers":["If-None-Match"],"response_headers":["ETag"]}'
			)
			.expect("Hello world!");
	});

	it("names its function and middleware", function () {
		assert.strictEqual(NEL.name, "networkErrorLogging");
		assert.strictEqual(
			NEL.name,
			NEL({
				report_to: "endpoint-1",
				max_age: 31536000,
				include_subdomains: true,
				success_fraction: 0.5,
				failure_fraction: 0.1,
			}).name
		);
	});
});
