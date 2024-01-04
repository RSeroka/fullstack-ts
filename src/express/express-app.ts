
import {promises as fsPromises} from 'fs';
import express from 'express';
import type * as core from 'express-serve-static-core';
// import type { Server as HTTPServer } from 'http';
import http from 'http';
import https from 'https';

/**
 * pathName defaults to "/"
 * folderName relative to the working directory of the process
 */
type ExpressAppStaticFilesConfig = Array<{
    pathName? : string; 
    folderName: string; 
}>;

export default class ExpressApp {
    private name: string;
    private app: core.Express; 
    private httpServer: http.Server | undefined;
    private httpsServer: https.Server | undefined;
    private httpPort: number | undefined;
    private httpsPort: number | undefined;
    private static readonly DEFAULT_HTTP_PORT = 8080;
    private static readonly DEFAULT_HTTPS_PORT = 8443;

    public constructor(name?: string, staticFilesConfig?: ExpressAppStaticFilesConfig) {
        this.name = name ? name : 'Express';

        this.app = express();

        this.app.use(express.json());

        this.app.get('/info', (req, res) => res.send(`This is the ${this.name} web app.`));

        this.app.post('/echo', (req, res) => {
            res.json({...req.body,...{"added": true}});
        });

        if (staticFilesConfig) {
            for (let index = 0; index < staticFilesConfig.length; index++) {
                const config = staticFilesConfig[index];
                if (config) {
                    const root = config.pathName ? config.pathName : '/';
                    // console.log(`use(${root}, express.static(${config.folderName}))`);
                    this.app.use(root, express.static(config.folderName));
                }
            }
        }

    }
 
    public get expressApp() : core.Express {
        return this.app;
    }

    public startServers(httpPort?: number, httpsPort?: number) {
        if (this.httpServer === undefined) {
            this.httpPort = httpPort === undefined ? this.httpPort = ExpressApp.DEFAULT_HTTP_PORT : this.httpPort = httpPort;
            this.httpServer = http.createServer(this.app);
            this.httpServer.listen(this.httpPort, () => console.log(`${this.name} app http listening on port ${this.httpPort}!`));
            // this.app.listen(this.httpPort, () => console.log(`${this.name} app http listening on port ${this.httpPort}!`));
        }
        if (this.httpsServer === undefined && process.env.hasOwnProperty("LETS_ENCRYPT_CERTIFICATE_DOMAIN")) {
            const certDomain = process.env["LETS_ENCRYPT_CERTIFICATE_DOMAIN"];
            const certDirectory = `/etc/letsencrypt/live/${certDomain}`;
            // const etcLetsEncryptDirectory = process.env.hasOwnProperty("ETC_LETS_ENCRYPT_DIR");
            Promise.all([
                fsPromises.readFile(`${certDirectory}/privkey.pem`, 'utf8'),
                fsPromises.readFile(`${certDirectory}/cert.pem`, 'utf8'),
                fsPromises.readFile(`${certDirectory}/chain.pem`, 'utf8')
            ]).then(([privateKey, certificate, ca]) => {
                const credentials = {
                    key: privateKey,
                    cert: certificate,
                    ca: ca
                };
                this.httpsPort = httpsPort === undefined ? ExpressApp.DEFAULT_HTTPS_PORT : httpsPort;
                this.httpsServer = https.createServer(credentials, this.app);
                this.httpsServer.on('error', (err: Error) => {
                    console.error(`https listener error: ${err.name}, ${err.message}`);
                });
                this.httpsServer.listen(this.httpsPort, () =>  console.log(`${this.name} app https listening on port ${this.httpsPort}!`));

            }).catch((reason: any) => {
                console.error(`Unable to start https listener.  Could not read certificates from ${certDirectory}`)
            });
  
        }
    }

    public shutdown() {
        if (this.httpServer !== undefined) {
            console.log(`${this.name} app shutting down HTTP server on port ${this.httpPort}`)
            this.httpServer.close(() => {
                console.log(`${this.name} app closed HTTP server on port ${this.httpPort}`);
                this.httpServer = undefined;
            });
        }
        if (this.httpsServer !== undefined) {
            console.log(`${this.name} app shutting down HTTPS server on port ${this.httpsPort}`)
            this.httpsServer.close(() => {
                console.log(`${this.name} app closed HTTPS server on port ${this.httpsPort}`);
                this.httpsServer = undefined;
            });    
        }
    }
    


}






