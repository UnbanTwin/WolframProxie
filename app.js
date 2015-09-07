var wolfram = require('wolfram-alpha').createClient("THYQLJ-3K45Y2A7W5");
var http = require('http');

var server = http.createServer(function (request, response) {
  // the incomming request object has all the info we

  wolfram.query("integrate 2x", function (err, data) {
    if (err) throw err;
    console.log("Result: %j", data);

    // we need to write some data back to the http response
    // set the header so browsers know this is json
    response.setHeader("Content-Type", "application/json");
    response.write(JSON.stringify(data));
    response.end();
  });
});

server.listen(8080);
