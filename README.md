This is a simple example of my code that I used for my job application.

It is a mathematical calculator that accepts a string as input, parses it and then performs the calculation. Easy :)

It consists of 2 parts - a fromt end application written with webpack and React and a backend application that runs a node.js server with Express.

In order to run them you will need to restore packages in both folders using "npm install" (or yarn, if you prefer) and then run
"node backend.js" from the backend folder and "npm start" from the front end folder.

There are also some tests for the backend part of the application at backend\test. you can run them using "mocha calculator.spec.js", assuming you have mocha installed globally.
