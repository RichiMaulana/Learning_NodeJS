const http = require('http');
const url = require('url');
const fs = require('fs');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const slugs = dataObj.map(el => slugify(el.productName, {lower: true}));

console.log(slugs);

const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true);
    const pathName = pathname;

    console.log(query);

    // Overview
    if(pathName === '/overview' || pathName === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)

        res.end(output);

    // Product
    } else if (pathName === '/product') {

        const product = dataObj[query.id]
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        const output = replaceTemplate(tempProduct, product)

        res.end(output);

    // Api
    } else if (pathName === '/api') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(data);

    // Not found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world'
        });
        res.end('<h1>Page not Found!</h1>');
    }
});

server.listen(8080, '127.0.0.1', () => {
    console.log('Linstening to request on port 8080');
});
