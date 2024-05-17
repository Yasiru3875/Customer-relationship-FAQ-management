import mongoose from "mongoose";
import {DB_CONNECTION_STRING} from "../configs/index.js";
import logger from "../utils/logger.js";

import 'dotenv/config';

let database;
const connect = async() => {
    const MONGODB_URL = DB_CONNECTION_STRING;
    if (database) return;
    mongoose.set('strictQuery', true);
    mongoose.connect(MONGODB_URL)
        .then((connection) => {
            database = connection;
            logger.info("Database synced");

        }).catch((err) => {
            logger.error(err.massage);

        })
}
export { connect };