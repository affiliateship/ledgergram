import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Account } from "./Account";

@Entity()
export class Post {

    @PrimaryColumn("integer", {name: "post_id"})
    postId!: number;

    @ManyToOne(() => Account, account => account.posts, { eager: true })
    @JoinColumn({ name: "account_id" })
    account!: Account;

    @Column({name: "content", type: "varchar"})
    content!: string;

    @Column({name: "likeCount", type: "integer"})
    likeCount!: string;

    @Column({name: "transaction_hash", type: "varchar"})
    transactionHash!: string;

    @Column({name: "blockNumber", type: "integer"})
    blockNumber!: number;

    @Column({name: "createdAt", type: "varchar"})
    createdAt!: string;

}