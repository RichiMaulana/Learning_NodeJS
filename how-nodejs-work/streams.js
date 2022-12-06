const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
	//fs.readFile('./starter/test-file.txt', (err, data) => {
	//	if (err) console.log(err);
	//	res.end(data);
	//});

	const readable = fs.createReadStream('./starter/test-file.txt1');	
	readable.on('data', chunk => {
		res.write(chunk);
	});

	readable.on('end', () => {
		res.end();
	});

	readable.on('error', err => {
		console.log(err);
		res.statusCode = 500;
		res.end('File Not Found!');

	});

});

server.listen(8000)
