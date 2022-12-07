const fsPro = require('fs/promises');
const superagent = require('/Users/richisetyamaulana/.nvm/versions/node/v18.12.1/lib/node_modules/superagent');

fsPro.readFile(`${__dirname}/dog.txt`, { encoding: 'utf8' })
	.then(data => {
		console.log(data);
		return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
	})
	.then(result => {
		console.log(result.body.message);
		
		fsPro.writeFile(`${__dirname}/dog-image-result.txt`, result.body.message);
		return "Cute dog picture saved to a file! 🐶";
	})
	.then(result => {
		console.log(result);
		return fsPro.readFile(`./dog-image-result.txt`, { encoding: 'utf8' });
	})
	.then(result => {
		console.log(result);
		fsPro.copyFile(`./dog-image-result.txt`, `./dog-image-result-copy.txt`);
		console.log('Cute dog picture is copied to other file');
		
	})
	.catch(err => {
		console.log(err);
	});
