var https = require('follow-redirects').https;
var fs = require('fs');

var qs = require('querystring');

var options = {
	method: 'POST',
	hostname: 'ptsv2.com', //test URL
	path: '/t/ob8gg-1598076748/post', //test URL
	headers: {
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxMTYwOTM2NSwiaWF0IjoxNTk2OTkzMTU4LCJleHAiOjE1OTc1OTc5NTh9.nh9-knc59mODdYfq5xt_VasdasdXD1a1AP1rzGG4',
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	maxRedirects: 20,
};

//pm temp setup
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

//temp setup
var pmTemp = [36.2, 36.3, 36.4, 36.5, 36.6, 36.7, 36.8, 36.9];
let pmTime = String(Math.floor(Math.random() * 30 + 30)).padStart(2, '0');
var selectedPmTemp = pmTemp[Math.floor(Math.random() * 8)];
var amTemp = [35.8, 35.9, 36, 36.1, 36.2, 36.3, 36.4, 36.5];
var selectedAmTemp = amTemp[Math.floor(Math.random() * 8)];
var amTime = String(Math.floor(Math.random() * 30 + 1)).padStart(2, '0');

//date time setup
let ts = Date.now();
let date_ob = new Date(ts);
let datePm = String(date_ob.getDate()).padStart(2, '0');
let dateAm = String(date_ob.getDate() - 1).padStart(2, '0');
let month = String(date_ob.getMonth() + 1).padStart(2, '0');
let year = date_ob.getFullYear();

//pm temp data
var postData = qs.stringify({
	PERNR: '11609000',
	temperature: selectedPmTemp,
	DateTimePM: year + '-' + month + '-' + datePm + 'T07:' + pmTime + ':20Z',
	temperaturePM: selectedPmTemp,
	hasVerified: 'false',
});

//am temp setup
var req2 = https.request(options, function (res) {
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

//am temp data
var postData2 = qs.stringify({
	PERNR: '11609000',
	temperature: selectedAmTemp,
	DateTimeAM: year + '-' + month + '-' + dateAm + 'T23:' + amTime + ':41.000Z',
	temperatureAM: selectedAmTemp,
	hasVerified: 'false',
});

console.log(postData);
console.log(postData2);

req.write(postData);
req.end();
req2.write(postData2);
req2.end();
