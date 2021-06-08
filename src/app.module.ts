import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import * as Joi from "joi";
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
            validationSchema: Joi.object({
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.string().required(),
                DB_USERNAME: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_NAME: Joi.string().required(),
                DB_CHARSET: Joi.string().required(),
                DB_TIMEZONE: Joi.string().required()
            })
        })
    ]
})
export class AppModule {}
