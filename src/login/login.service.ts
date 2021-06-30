import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { LoginDTO } from "./dto/login.dto";

import * as bcrypt from "bcrypt";

@Injectable()
export class LoginService {
    constructor(@InjectRepository(User) private readonly user: Repository<User>) {}

    async login(loginDto: LoginDTO) {
        try {
            const user = await this.user.findOne({
                userId: loginDto.userId
            });

            console.log(await bcrypt.hash(loginDto.password, 10));

            return await bcrypt.compare(loginDto.password, user.password);
        } catch (error) {
            console.error(error);

            return {
                result: false
            };
        }
    }
}
