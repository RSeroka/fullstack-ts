# fullstack-ts
 
## Introduction

This repository is a Fullstack web application.   

### Typescript React Client 

Located in the /client directory, this application is constructed with create-react-app.dev and uses the typescript, progressive web app (PWA) template.   It also includes FontAwesome and React Bootstrap.   

Interesting general aspects include a factory facade to incorporate FontAwesome icons so that only the icons needed by the app are included in tha app.   Also, the boilerplate React source code is enhanced to detect and refresh stale PWA cache when the application is updated. 

### Typescript Express Node.js server 

Located in the /src and /tests directories, this web server is comprised of a general Typescript encapsulation of the Node.js APIs and two modules, blackjack and sudoku that provide stateless server web APIs that are called from the client.

### Sudoku Solver Application 

Located in the /src/sudoku, /tests/sudoku, and /client/src/Sudoku directories, the Sudoku Solver Application solves sudoku grids.   Unlike other sudoku applications that allow you to play, this application solves the grid automatially and allows the user to step through the solution step by step.  

The grid solution implemented on the server side and all steps for completion are sent back in one request/reply.   The client app uses React state to store the solution steps that allows the application to traverse the solution steps in both forward and backward directions. 

### Blackjack Strategy Analyzer  

Located in the /src/blackjack, /tests/blackjack, and /client/src/BlackJack directories, the Blackjack Strategy Analyzer allows user to provide the Blackjack "house rules" and player strategy and run up to 100,000 hands via monte carlo simulation.   The results are then provided to the user in both aggregated and on a per player strategy instruction basis.    

### Testing

Testing is primarily on the server application.  Client testing has not been implemented yet.   Server testing is implemented as many unit tests implemented with Mocha and Chai.   The environment variable NO_SERVER_MODE set to "true" will allow mocha to startup without starting the Express service, allowing the modules to be tested outside the server instance.   NPM scripts can use "env-cmd -e mocha-test ..." prefix to properly set the environment variable. 

### Build

From the /src and /client directories, run the "npm install" command.
From the /src directory, run the node script "npm run all-rebuild", which runs the client and server builds simultaneously.   The server build is simply a "tsc" to compile the Typescript to JavaScript.  The client build uses the create-react-app build process to build an optimized production build.  

For running the client in interactive development mode, use the combination of the "npm run local-express-server" command from the /src directory to start the server and the "npm run start" command from the /client directory.   

By default, the Express server runs on http port 8080.   

### Deployment

Dockerfile configuration for building docker container is provided.   The "npm run docker-build" and "npm run docker-run" npm scripts are provided to build and run docker container respectively.   


