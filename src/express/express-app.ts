
import express from 'express';
import type * as core from 'express-serve-static-core';
import type { Server } from 'http';

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
    private server: Server | undefined;
    private httpPort: number | undefined;
    private static readonly DEFAULT_PORT = 8080;

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
                    this.app.use(root, express.static(config?.folderName));
                }
            }
        }

    }
 
    public get expressApp() : core.Express {
        return this.app;
    }

    public startHttpServer(port?: number) {
        if (this.server === undefined) {
            if (port === undefined) {
                this.httpPort = ExpressApp.DEFAULT_PORT;
            }
            else {
                this.httpPort = port;
            }

            this.server = this.app.listen(this.httpPort, () => console.log(`${this.name} app listening on port ${this.httpPort}!`));
        }
    }

    public shutdown() {
        if (this.server !== undefined) {
            console.log(`${this.name} app shutting down HTTP server on port ${this.httpPort}`)
            this.server.close(() => `${this.name} app closed HTTP server on port ${this.httpPort}`);
        }
    }
    


}






