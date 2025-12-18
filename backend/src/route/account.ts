import express from 'express';
import { createAccount, login } from '../controller/account';

export const router: express.IRouter = express.Router();

router.post("/account", createAccount);
router.post("/login", login);