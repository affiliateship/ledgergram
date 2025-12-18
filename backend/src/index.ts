import express from "express";
import config from "../config.json";
import { router } from "./route";
import cors from 'cors';
import { load } from "./loader";
import logger from "./loader/logger";

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:4000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: false
}));
app.use(router);
app.listen(config.PORT, () => {
  logger.info(`
  ################################################
  🛡️  Server listening on port: ${config.PORT} 🛡️
  ################################################
  `);
});

load();

export default app;
