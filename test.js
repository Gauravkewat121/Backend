const moment = require('moment-timezone');

console.log(moment());   // time which is setDefault ---> india

console.log(moment.utc());  // UTC time from IANA DB

let time = moment.tz("2026-03-18 10:00", "Asia/Kolkata");

console.log(time);

console.log(moment());