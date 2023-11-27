import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import httpStatus from 'http-status';
import morgan from './config/morgan';
import xss from './middlewares/xss';
import { authLimiter } from './middlewares/rateLimiter';
import routes from './routes/v1';
import { errorConverter, errorHandler } from './middlewares/error';
import ApiError from './utils/apiError';

const app = express();
const {
    NODE_ENV,
     
  } = process.env
if (NODE_ENV !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

 
app.use(express.json());
 
app.use(express.urlencoded({ extended: true }));
 
app.use(xss());

 
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

 
 

// limit repeated failed requests to auth endpoints
if (NODE_ENV === 'production') {
    app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

 
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

 
app.use(errorConverter);

 
app.use(errorHandler);

export default app;
