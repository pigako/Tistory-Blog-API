import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

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
        }),
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            charset: process.env.DB_CHARSET,
            timezone: process.env.DB_TIMEZONE,
            synchronize: true,
            logging: true,
            entities: [__dirname + "/entities/*{.ts,.js}"]
        })
    ]
})
export class AppModule {}
