


import FullStackExpressApp from './fullstack-express-app';


const fullstackExpressApp = new FullStackExpressApp();

if (!process.env.hasOwnProperty("NO_SERVER_MODE")) {
    fullstackExpressApp.startServers();
}

function invokeShutdown(signal:NodeJS.Signals) {
    console.warn(`${signal} received, shutdown the services`);
    fullstackExpressApp.shutdown();
}

process.on('SIGTERM', invokeShutdown);
process.on('SIGINT', invokeShutdown);
