import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class LoginService {
    constructor(@InjectRepository(UserEntity) private readonly user: Repository<UserEntity>) {}

    async test() {
        return await this.user.save(
            this.user.create({
                userId: "TEST",
                password: "TEST"
            })
        );
    }
}
