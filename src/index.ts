import {Server} from "http";
import {PrismaClient} from '@prisma/client'
require("dotenv").config({
    path: ".env",
  });
import logger from "./config/logger";
import app from "./app";
const prisma = new PrismaClient()

let server: Server;

prisma.$connect().then(() => {
    logger.info('Connected to SQL Databases')
    server = app.listen(process.env.PORT, () => {
        logger.info(`Listening to port ${process.env.PORT}`);
    })
})
