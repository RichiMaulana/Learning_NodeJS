const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
	if (err) return console.log(err);
	console.log(`The file is contain: ${data}`);

	superagent.get(`https://dog.ceo/api/bread/${data}/images/random`, (err, result) => {
		if (err) return console.log(err.message);
		console.log(result.body.message);
		
		fs.writeFile(`${__dirname}/dog-image-result.txt`, result.body.message, (err) => {
			if (err) return console.log(err);
			console.log('Cute dog picture saved to a file! 🐶');
			
			fs.readFile(`${__dirname}/dog-image-result.txt`, (err, images) => {
				if (err) return console.log(err);
				console.log('images');
				
				fs.copyFile(`${__dirname}/dog-image-result.txt`, `${__dirname}/dog-image-result-copy.txt`, (err) => {
					if (err) return console.log(err);
					console.log('Cute dog picture is copied to other file');
				});
			});
		});
	});
});				
