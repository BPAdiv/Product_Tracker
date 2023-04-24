import express, { Router } from "express";
import {
  connectTelegram,
  removeTelegramId,
} from "../controlers/telegramControler";
const telegramRouter: Router = express.Router();

telegramRouter.put("/connect", connectTelegram);
telegramRouter.put("/remove/:userId", removeTelegramId);
export default telegramRouter;
