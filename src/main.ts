import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import * as helmet from "helmet";
import * as morgan from "morgan";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const prefix = "/api/v1";
    app.setGlobalPrefix(prefix);
    app.enableCors({
        allowedHeaders: "Content-Type",
        methods: "POST,GET,PUT,PATCH,DELETE,OPTIONS",
        credentials: true,
        origin: true
    });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            transformOptions: { enableImplicitConversion: true }
        })
    );
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(cookieParser());

    const config = new DocumentBuilder()
        .setTitle("TISTORY BLOG API")
        .setVersion("1.0")
        .setDescription("티스토리 블로그용 API 문서입니다.")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${prefix}/api-docs`, app, document, {
        customSiteTitle: "TISTORY BLOG API"
    });

    const port = process.env.NODE_ENV === "production" ? 80 : 3000;
    await app.listen(port);
}
bootstrap();
