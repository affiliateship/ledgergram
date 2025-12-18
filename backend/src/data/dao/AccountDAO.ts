import logger from "../../loader/logger";
import { dataSource } from "../db/Datasource";
import { Account } from "../entity/Account";

export async function saveAccount(account: Account): Promise<Account> {
    try {
        const result: Account = await dataSource!.getRepository(Account).save(account);
        return result;
    } catch (e) {
        logger.error(e);
        throw e;
    }
}

export async function getAccountByUsername(username: string): Promise<Account | null> {
    try {
        const result: Account | null = await dataSource!.getRepository(Account).
        findOne({ where: { username: username } });
        return result;
    } catch(e) {
        logger.error(e);
            throw e;
    }
}

export async function getAccountById(accountId: string): Promise<Account | null> {
    try {
        const result: Account | null = await dataSource!.getRepository(Account).
        findOne({ where: { accountId: accountId } });
        return result;
    } catch(e) {
        logger.error(e);
            throw e;
    }
 }
