import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import Debug from 'debug';
const debug = Debug(`${process.env.SERVICE_ID}`);
import AdRoutes from './routes/ads.routes';
import errorMiddleware from './middleware/error.middleware';
import AdsController from './controllers/ads.controller';
import AdsService from './services/ads.service';
import useragent from 'express-useragent';
import { connectMongoDb } from './db/mongodb';
import { createAd } from './handlers/createAd';
// const mq = require('./src/mq');

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  public serviceId: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.env = process.env.NODE_ENV || 'dev';
    this.serviceId = process.env.SERVICE_ID || 'randomServiceId';

    connectMongoDb();
    this.initializeMiddlewares();
    this.initializeRoutes([new AdRoutes(new AdsController(new AdsService()))]); // TODO: better DI..
    this.initializeErrorHandling(); // Need to be last, initialize after all routes

    // mq.subscribe('create-ad', (newAd, ack, nack) => {

    // TODO: COMPLETE LOGIC.
    // createAd(newAd);
    //   ack();
    // });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`app listening on port ${this.port}...`);
      debug(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    console.log('Initialize middlewares');
    this.app.use(morgan('dev'));
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(useragent.express());
  }

  private initializeRoutes(routes: any) {
    routes.forEach((route: any) => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
