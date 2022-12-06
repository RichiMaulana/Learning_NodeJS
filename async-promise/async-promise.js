const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('Could not find the file');
            if (data) resolve(data.toString());
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) reject('Could Not Write to the File');
            resolve("Success Writing to File!");
        });
    });
};

const getDogImage = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);

        const imgs = all.map(el => el.body.message);

        console.log(imgs)

        await writeFilePro('./starter/dog-result.txt', imgs.join('\n'));
        console.log("Random image saved to file!");
    } catch (err) {
        if (err.message) {
            throw err.message;
            // console.log(err.message)
        } else {
            throw err
            // console.log(err);
        }
    }
    return "2: Ready!";
};


//// USING ASYNC AWAIT WAY to access the awync await function return value
(async () => {
    try {
        console.log("1: Getting the dog images")
        // console.log(getDogImage())
        const x = await getDogImage()
        console.log(x)
        console.log("3: Done")
    } catch (err) {
        console.log(err)
    }
})();

/// Way to get the data from async function
/*
console.log("1: Getting the dog images")
getDogImage().then(x => {
    console.log(x)
    console.log("3: Done")
}).catch(err => {
    console.log(err)
})

*/

////// THE REAL PROMISE WAY!!
// readFilePro(`${__dirname}/dog.txt`)
//     .then(data => {
//         console.log(`Breed: ${data}`);
//         return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     })
//     .then(result => {
//         console.log(result.body.message);
//         return writeFilePro('./starter/dog-result.txt', result.body.message);
//     })
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         if (err.message) console.log(err.message); else console.log(err);
//     });


////// PROMISE BUT CALLBACK
// readFilePro(`${__dirname}/dog.txt`).then(data => {
//     console.log(`Breed: ${data}`);
//
//     superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then(result => {
//         console.log(result.body.message);
//
//         writeFilePro('./starter/dog-result.txt', result.body.message).then(result => {
//             console.log(result);
//         });
//     }).catch(err => {
//         console.log(err.message);
//     });
// }).catch(err => {
//     console.log(err);
// });


//////// ASYNCHRONOUS CALLBACK WAY
// fs.readFile('./starter/dog.txt', (err, data) => {
//     if (err) return console.log("Cannot find the file");
//     console.log(`Breed: ${data}`);
//
//     superagent.get(`https://dog.ceo/api/breed/${data}/images/random`, (err, result) => {
//         if (err) return console.log(err.message);
//         console.log(result.body.message);
//
//         fs.writeFile('./starter/dog-result.txt', result.body.message, (err) => {
//             if (err) return console.log(err);
//             console.log("File Written 😀");
//         });
//     });
// })