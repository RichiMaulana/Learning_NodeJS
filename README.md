# 

![NodeJS Logo](https://nodejs.org/static/images/logo.svg)

# First Section: Build a Simpe API as an Introduction to NodeJS

What I learn in this section is well explained material to NodeJS and
Learn how to build simple API using it, such as:

1.  What is Node JS and Why Use It?

2.  Running JavaScript Outside the Browser

3.  Using Modules

4.  Basic Reading and Writing File

5.  Blocking and Non-Blocking: Asynchronous Nature of Node JS

6.  Basic Reading and Writing File Asynchronous way

7.  Creating a Simple Web Server

8.  Routing

9.  Build a Very Simple API

10. HTML Templating: Build the Templates ad Filling the Templates

11. Parsing Variables from URLs

12. Introduction to NPM and the package.json

13. Type of Packages and Installs

14. Package Versioning and Updating

I will explain every single point later, maybe :D, it’s my own notes
anyway :b

# Second Section: Introduction to Back-End Web Development

In this section I learn about basic knowledge how Web works, HTTP and
others, such as:

1.  An Overview of How the Web is Works

2.  HTTP in Action

3.  Front-End vs. Back-End Web Development

4.  Static vs Dynamic vs API

same as above (:

# How Node JS Works: A Look Behind the Scenes

This Section is actually more deep explained about how Node JS work
behind the scenes, such as:

1.  Node, V8, Libuv and C + Node JS is actually built with V8 engine
    (not a car engine) from Google using Libuv Library and Using C
    Programming Language

2.  Processes, Threads and Thread Pool  
    From what i get from this Section, Node JS is Single threated
    application, meaning that Node JS is just using 1 (one) thread to
    handle request. And using Thread Pool (Thread that Node JS use to
    actually process the request(process it in background (honestly I
    don’t really know about this, maybe I will repeat this section again
    later)))

3.  The Node JS Event Loop

4.  Events and Event-Driven Architecture

5.  Introduction to Streams  
    Streams is used to read a large amount of data, such as large file,
    video, etc.

6.  How Requiring Modules Really Works

# Asynchronous JavaScript: Promises and Async/Await

From this section, I learn about how callback can ruin our code.

1.  The Problem with Callbacks: Callbacks Hell  
    Here is the Example:  

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

    See how the code making the triangle shape? Well, that’s the point
    of this section, to get rid of that triangle by using bellow method.

2.  From Callback Hell to Promises  
    Promise is basically the future value that we expect to get from a
    function. Here is the recreate of above code using promises:  

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

    Promises make the code easier to understand and maintain.

3.  Consuming Promises with Async/Await  
    Async is basically mean Asynchronous, that means a function with
    async will performing the code that’s in the function, while the
    rest of the code keeps running in the Event Loop (Without blocking
    the Event Loop). Await is used in inside of the async function,
    await will sotop the code and wait for promises function until it’s
    get the value. Here is the example of Async/Await :  

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

4.  Returning Values from Async Functions

5.  Waiting for Multiple Promises Simultaneously

# Express: Start Building an API

1.  What is Express?  
    Express is framework for Node JS to build a web application. The
    short is this module can make our application build process a little
    bit easier then without using it.

2.  Postman Intro  
    Postman is an application to access and test our API.

3.  Setting up Express and Basic Routing.  
    In this section the lecturer explain about how to actually using
    Express and setup a basic routing using it.

4.  To Be Continued…​
