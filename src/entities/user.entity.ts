import { InternalServerErrorException } from "@nestjs/common";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn("increment", { type: "bigint", unsigned: true, comment: "유저 유니크 아이디" })
    userUid: number;

    @Column()
    userId: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        if (this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 10);
            } catch (error) {
                console.error(error);

                throw new InternalServerErrorException();
            }
        }
    }
}
