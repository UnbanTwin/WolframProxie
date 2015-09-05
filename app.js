var wolfram = require('wolfram-alpha').createClient("THYQLJ-3K45Y2A7W5");

wolfram.query("integrate 2x", function (err, result) {
  if (err) throw err;
  console.log("Result: %j", result);
});
