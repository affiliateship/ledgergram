import config from "../../config.json";
import FireFly, { FireFlyEventDelivery } from "@hyperledger/firefly-sdk";
import instachain from "../../../solidity/artifacts/contracts/instachain.sol/InstaChain.json";
import { Post } from "../data/entity/Post";
import { savePost, updatePost } from "../data/dao/PostDAO";
import { Account } from "../data/entity/Account";
import { getAccountById } from "../data/dao/AccountDAO";
import logger from "./logger";

const postFfiName: string = `postFFI-${config.VERSION}`;
const postApiName: string = `postApi-${config.VERSION}`;

export const firefly: FireFly = new FireFly({
    host: config.HOST,
    namespace: config.NAMESPACE,
});

export async function initFireFly() {
    await firefly
        .generateContractInterface({
        name: postFfiName,
        namespace: config.NAMESPACE,
        version: "1.0",
        description: "Deployed post contract",
        input: {
            abi: instachain.abi,
        },
        })
        .then(async (ssGeneratedFFI) => {
        if (!ssGeneratedFFI) return;
        return await firefly.createContractInterface(ssGeneratedFFI, {
            confirm: true,
        });
        })
        .then(async (contractInterface) => {
        if (!contractInterface) return;
        return await firefly.createContractAPI(
            {
            interface: {
                id: contractInterface.id,
            },
            location: {
                address: config.INSTACHAIN_ADDRESS,
            },
            name: postApiName,
            },
            { confirm: true }
        );
        })
        .catch((e) => {
        const err = e.originalError ? JSON.parse(JSON.stringify(e.originalError)) : e;

        if (err.status === 409) {
            logger.info("'postFFI' already exists in FireFly. Ignoring.");
        } else {
            return;
        }
        });
    
    
    // Listeners
    await firefly.createContractAPIListener(postApiName, "PostCreated", {
        topic: "postcreated",
    }).catch((e) => {
        const err = JSON.parse(JSON.stringify(e.originalError));
        if (err.status === 409) {
            logger.info(
            "Simple storage 'changed' event listener already exists in FireFly. Ignoring."
            );
        } else {
            logger.error(
            `Error creating listener for postcreated event: ${err.message}`
            );
        }
    });

    await firefly
    .createContractAPIListener(postApiName, "PostLiked", {
    topic: "postliked",
    })
    .catch((e) => {
    const err = JSON.parse(JSON.stringify(e.originalError));

    if (err.status === 409) {
        logger.info(
        "Simple storage 'changed' event listener already exists in FireFly. Ignoring."
        );
    } else {
        logger.error(
        `Error creating listener for postliked event: ${err.message}`
        );
    }
    });
    
    
    firefly.listen(
        {
        filter: {
            events: "blockchain_event_received",
        },
        },
        async (socket, _event) => {
        const event = _event as FireFlyEventDelivery;
        const output = event.blockchainEvent?.output;
        if (event.blockchainEvent.name === "PostCreated") {
            const account: Account = await getAccountById(output.userId);
            const post = new Post();
            post.postId = output.id;
            post.account = account;
            post.transactionHash = event.blockchainEvent?.info?.transactionHash;
            post.blockNumber = event.blockchainEvent?.info?.blockNumber;
            post.content = output.content;
            post.likeCount = output.likeCount;
            post.createdAt = output.createdAt;
            savePost(post);
        } else if (event.blockchainEvent.name === "PostLiked") {
            updatePost(output.postId, output.newLikeCount);
        }
        logger.info(
            `${event.blockchainEvent?.info.signature}: ${JSON.stringify(
            event.blockchainEvent?.output,
            null,
            2
            )}`
        );
        
        }
    );
}