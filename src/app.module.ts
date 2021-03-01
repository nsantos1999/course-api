import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './course/course.module';

// Configs objects
import { envConfig } from './commom/configs/env.config';
import { typeOrmConfig } from './commom/configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRoot(typeOrmConfig()),

    CourseModule,
  ],
})
export class AppModule {}
