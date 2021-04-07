const request = require('request');
const userId = '00346878-3f49-413b-9d8c-1fc13b1e7387';
const pin = '1234';

//temp setup
const temp = [36.2, 36.3, 36.4, 36.5, 36.6, 36.7, 36.8, 36.9];
const selectedTemp = temp[Math.floor(Math.random() * 8)];

function getCurrentDate() {
  let currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 8);
  return currentDate;
}

function getCurrentDateFormatted() {
  let currentDate = getCurrentDate();

  let d = currentDate.getDate() - 1;
  let dd = String(d).padStart(2, '0');
  let mm = String(currentDate.getMonth() + 1).padStart(2, '0');
  let yyyy = currentDate.getFullYear();

  return yyyy + '-' + mm + '-' + dd + 'T16:00:00.000Z';
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
    url: 'https://ptr.nsfc.live/api/temperature',
    //   url: 'http://ptsv2.com/t/ob8gg-1598076748/post', //testURL
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      meridies: getMeridies(),
      userId: userId,
      temperatureAt: getCurrentDateFormatted(),
      temperature: selectedTemp,
      pin: pin,
    }),
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
};
