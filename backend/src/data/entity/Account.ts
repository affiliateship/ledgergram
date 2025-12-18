import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";

@Entity()
export class Account {

    @PrimaryGeneratedColumn("uuid", {name: "account_id"})
    accountId!: string;

    @Column({type: "varchar",  length: 256, unique: true})
    username!: string;

    @Column({name: "first_name", type: "varchar"})
    firstName!: string;

    @Column({name: "last_name", type: "varchar"})
    lastName!: string;

    @Column({name: "hashed_password", type: "varchar"})
    hashedPassword!: string;

    @Column({name: "created_at", type: "bigint"})
    createdAt!: string;

    @OneToMany(() => Post, post => post.account)
    posts!: Post[];

}