import express from "express";
import { AccountRequest } from "../data/model/AccountRequest";
import logger from "../loader/logger";
import { authenticate, register } from "../service/AccountService";

export async function createAccount(req: express.Request, res: express.Response) {
    try {
        const account: AccountRequest = new AccountRequest();
        account.firstName = req.body.firstName;
        account.lastName = req.body.lastName;
        account.username = req.body.username;
        account.password = req.body.password;
        const result = await register(account);
        res.status(201).send({
            result
        });
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({
            error: e.message,
        });
    }
}

export async function login(req: express.Request, res: express.Response) {
    try {
        const account: AccountRequest = new AccountRequest();
        account.username = req.body.username;
        account.password = req.body.password;
        const result = await authenticate(account);
        res.status(200).send({
            result
        });
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({
            error: e.message,
        });
    }
}