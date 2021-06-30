import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginDTO } from "./dto/login.dto";
import { LoginService } from "./login.service";

@Controller("login")
@ApiTags("Login")
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    async login(@Body() loginDto: LoginDTO) {
        return this.loginService.login(loginDto);
    }
}
