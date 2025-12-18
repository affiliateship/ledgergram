import { Account } from "../data/entity/Account";
import { AccountRequest } from "../data/model/AccountRequest";
import bcrypt from 'bcrypt';
import logger from "../loader/logger";
import { AccountResponse } from "../data/model/AccountResponse";
import { getAccountByUsername, saveAccount } from "../data/dao/AccountDAO";

export async function register(accountRequest: AccountRequest) {
    try {
        const account: Account = new Account();
        const digest: string = await hashPassword(accountRequest.password);
        account.firstName = accountRequest.firstName;
        account.lastName = accountRequest.lastName;
        account.username = accountRequest.username;
        account.hashedPassword = digest;
        account.createdAt = Date.now().toString()
        const result = await saveAccount(account);
        return mapToAccountResponse(result);
    } catch (e) {
        logger.error(e);
        throw e;
    }
}

export async function authenticate(accountRequest: AccountRequest): Promise<AccountResponse> {
    try {
        const account: Account | null = await getAccountByUsername(accountRequest.username);
        const isVerified: boolean = await verifyPassword(accountRequest.password, account.hashedPassword);
        if (isVerified) {
            return mapToAccountResponse(account);
        } else {
            throw new Error("Authentication failed");
        }
    } catch (e) {
        logger.error(e);
        throw e;
    }
}

async function hashPassword(rawPassword: string, saltRounds: number = 10): Promise<string> {
    return await bcrypt.hash(rawPassword, saltRounds);
}

async function verifyPassword(clientEntered: string, dbPassword: string):Promise<boolean> {
    return await bcrypt.compare(clientEntered, dbPassword);
}

function mapToAccountResponse(account: Account) {
    const accountResponse = new AccountResponse();
    accountResponse.accountId = account.accountId;
    accountResponse.username = account.username;
    accountResponse.firstName = account.firstName;
    accountResponse.lastName = account.lastName;
    accountResponse.createdAt = account.createdAt;
    return accountResponse;
}