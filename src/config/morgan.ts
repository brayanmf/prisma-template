import { Response } from 'express';
import morgan from 'morgan';

import logger from './logger';


const {NODE_ENV}=process.env

morgan.token('message', (req, res: Response) => res.locals.errorMessage || '');

const getIpFormat = () => (NODE_ENV === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

export const successHandler = morgan(successResponseFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: { write: (message) => logger.info(message.trim()) }
});

export const errorHandler = morgan(errorResponseFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: { write: (message) => logger.error(message.trim()) }
});

export default {
    successHandler,
    errorHandler
};