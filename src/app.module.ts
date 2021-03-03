import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './course/course.module';

// Configs objects
import { envConfig } from './configs/env.config';
import { typeOrmConfig } from './configs/typeorm.config';
import { LanguageModule } from './language/language.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRoot(typeOrmConfig()),

    CourseModule,

    LanguageModule,
  ],
})
export class AppModule {}
