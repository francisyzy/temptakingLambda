var request = require('request');

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

var options = {
	method: 'POST',
	url: 'https://temptaking.herokuapp.com/users/register',
	// url: 'http://ptsv2.com/t/ob8gg-1598076748/post', //testURL
	headers: {
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxMTYwOTM2NSwiaWF0IjoxNTk2OTkzMTU4LCJleHAiOjE1OTc1OTc5NTh9.nh9-knc59mODdYfq5xt_VmfKBZGbZWXD1a1AP1rzG',
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	form: {
		PERNR: '11609365',
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

var options2 = {
	method: 'POST',
	url: 'https://temptaking.herokuapp.com/users/register',
	// url: 'http://ptsv2.com/t/ob8gg-1598076748/post', //testURL
	headers: {
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxMTYwOTM2NSwiaWF0IjoxNTk2OTkzMTU4LCJleHAiOjE1OTc1OTc5NTh9.nh9-knc59mODdYfq5xt_VmfKBZGbZWXD1a1AP1rzG',
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	form: {
		PERNR: '11609365',
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
