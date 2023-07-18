


import FullStackExpressApp from './fullstack-express-app';


const fullstackExpressApp = new FullStackExpressApp();

if (!process.env.hasOwnProperty("NO_SERVER_MODE")) {
    fullstackExpressApp.startHttpServer();
}


