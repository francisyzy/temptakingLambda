const request = require('request');
const PERNR = '11609000';

//temp setup
const pmTemp = [36.2, 36.3, 36.4, 36.5, 36.6, 36.7, 36.8, 36.9];
let pmTime = String(Math.floor(Math.random() * 30 + 30)).padStart(2, '0');
const selectedPmTemp = pmTemp[Math.floor(Math.random() * 8)];
const amTemp = [35.8, 35.9, 36, 36.1, 36.2, 36.3, 36.4, 36.5];
const selectedAmTemp = amTemp[Math.floor(Math.random() * 8)];
const amTime = String(Math.floor(Math.random() * 30 + 1)).padStart(2, '0');

//date time setup
let ts = Date.now();
let date_ob = new Date(ts);
let datePm = String(date_ob.getDate()).padStart(2, '0');
let dateAm = String(date_ob.getDate() - 1).padStart(2, '0');
let month = String(date_ob.getMonth() + 1).padStart(2, '0');
let year = date_ob.getFullYear();

exports.handler = function (event, context, callback) {
	console.log('sending temp for: ' + PERNR);
	const options = {
		method: 'POST',
		url: 'http://ptsv2.com/t/ob8gg-1598076748/post', //testURL
		headers: {
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxMTYwOTMasdasd2OTkzMTU4LCJleHAiOjE1OTc1OTc5NTh9.nh9-knc59mODdYfq5xt_VmfKBZGbZWXD1a1AP1rzG',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		form: {
			PERNR: PERNR,
			temperature: selectedPmTemp,
			DateTimePM: year + '-' + month + '-' + datePm + 'T07:' + pmTime + ':20Z',
			temperaturePM: selectedPmTemp,
			hasVerified: 'false',
		},
	};
	request(options, function (error, response) {
		if (error) throw new Error(error);
		console.log(response.body);
	});

	const options2 = {
		method: 'POST',
		url: 'http://ptsv2.com/t/ob8gg-1598076748/post', //testURL
		headers: {
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxMTYwOTM2NSwiaWF0IjoxNTk2OTkzMTU4asdasdiOjE1OTc1OTc5NTh9.nh9-knc59mODdYfq5xt_VmfKBZGbZWXD1a1AP1rzG',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		form: {
			PERNR: PERNR,
			temperature: selectedAmTemp,
			DateTimeAM: year + '-' + month + '-' + dateAm + 'T23:' + amTime + ':41.000Z',
			temperatureAM: selectedAmTemp,
			hasVerified: 'false',
		},
	};
	request(options2, function (error, response) {
		if (error) throw new Error(error);
		console.log(response.body);
	});
};
