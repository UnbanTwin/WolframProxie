var wolfram = require('wolfram-alpha').createClient("THYQLJ-3K45Y2A7W5");
var http = require('http');
var url = require('url');

var server = http.createServer(function (request, response) {
    response.setHeader('X-Clacks-Overhead', 'GNU Terry Pratchet');
    if (request.url.indexOf("favicon") != -1) return response.end();
    if (request.url.indexOf("wolfram") != -1) {
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
            response.setHeader('X-Clacks-Overhead', 'GNU Terry Pratchet');
            response.write(JSON.stringify(data));
            response.end();
            return
        });
    }
    else if (request.url.indexOf("dice")){
        var sides = parseInt(url.parse(request.url, true).query.sides);
        console.dir(sides);
        if (isNaN(sides)) sides = 6;
        var number = Math.floor(Math.random() * sides + 1);
        response.setHeader("Content-Type", "application/json");
        response.setHeader('Access-Control-Allow-Origin', '*');

        response.write(JSON.stringify({result : number}));

        response.end()

    }else {
        response.end();
    }

    // the incomming request object has all the info we

});

server.listen(process.env.PORT || 8080);
console.log(process.env.PORT || 8080);
