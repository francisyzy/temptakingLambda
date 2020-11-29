const request = require('request');
const groupCode = '8895d71c38190cd02aff325751bd';
const memberId = '1302236';
const pin = '1234';

//temp setup
const temp = [36.2, 36.3, 36.4, 36.5, 36.6, 36.7, 36.8, 36.9];
const selectedTemp = temp[Math.floor(Math.random() * 8)];

function getCurrentDate() {
    let currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 8);
    return currentDate;
}

function getCurrentDMY() {
  let currentDate = getCurrentDate();

  let dd = String(currentDate.getDate()).padStart(2, '0');
  let mm = String(currentDate.getMonth() + 1).padStart(2, '0');
  let yyyy = currentDate.getFullYear();

  return dd + '/' + mm + '/' + yyyy;
}

function getMeridies() {
  let currentDate = getCurrentDate();

  if (currentDate.getHours() >= 12) {
    return 'PM';
  } else {
    return 'AM';
  }
}

exports.handler = function (event, context, callback) {
	const options = {
	  method: 'POST',
	  url: 'https://temptaking.ado.sg/group/MemberSubmitTemperature',
	//   url: 'http://ptsv2.com/t/ob8gg-1598076748/post', //testURL
	  // headers: {
	  //   'Content-Type': 'application/x-www-form-urlencoded',
	  // },
	  form: {
		groupCode: groupCode,
		date: getCurrentDMY(),
		meridies: getMeridies(),
		memberId: memberId,
		temperature: selectedTemp,
		pin: pin,
	  },
	};
	request(options, function (error, response) {
	  if (error) throw new Error(error);
	  console.log(response.body);
	});
};
