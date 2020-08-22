var https = require('follow-redirects').https;
var fs = require('fs');

var qs = require('querystring');

var options = {
	method: 'POST',
	hostname: 'temptaking.herokuapp.com',
	path: '/users/register',
	headers: {
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxMTYwOTM2NSwiaWF0IjoxNTk2OTkzMTU4LCJleHAiOjE1OTc1OTc5NTh9.nh9-knc59mODdYfq5xt_VmfKBZGbZWXD1a1AP1rzG',
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	maxRedirects: 20,
};

var req = https.request(options, function (res) {
	var chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function (chunk) {
		var body = Buffer.concat(chunks);
		console.log(body.toString());
	});

	res.on('error', function (error) {
		console.error(error);
	});
});

var postData = qs.stringify({
	PERNR: '11609365',
	temperature: '36.5',
	DateTimeAM: '2020-08-14T23:23:39.000Z',
	temperatureAM: '36.5',
	hasVerified: 'false',
});

req.write(postData);

req.end();
