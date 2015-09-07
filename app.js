var wolfram = require('wolfram-alpha').createClient("THYQLJ-3K45Y2A7W5");
var http = require('http');
var url = require('url');

var server = http.createServer(function (request, response) {
  if (request.url.indexOf("favicon") != -1) return response.end();
  // the incomming request object has all the info we
  console.log("incomming request for " + request.url);
  console.log(url.parse(request.url, true));
  var search = url.parse(request.url, true).query.search;
  wolfram.query(search, function (err, data) {

    if (err) throw err;
    console.log("Wolfram responded!");

    // we need to write some data back to the http response
    // set the header so browsers know this is json
    response.setHeader("Content-Type", "application/json");
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.write(JSON.stringify(data));
    response.end();
  });
});

server.listen(process.env.PORT || 8080);
console.log(process.env.PORT || 8080);
