import express from 'express';
import cors from 'cors';
import cookiePraser from 'cookie-parser';
import 'dotenv/config';
import logger from './utils/logger.js';
import { connect } from './utils/database.connection.js';

import authRoutes from "./routes/auth.js";
import managerRoutes from "./routes/manager.js";
import feedBackRoutes from "./routes/feedback.js";
import faqRoutes from "./routes/faq.js";
const app = express();
const PORT = process.env.PORT || "9090";

const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
app.use(express.json({ limit: "20mb" }));
app.use(cookiePraser());

app.listen(PORT, () => {
    logger.info(`server is up an running on PORT ${ PORT } `);
    connect();
});

app.use("/api", authRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/feedback", feedBackRoutes);
app.use("/api/faq", faqRoutes);




