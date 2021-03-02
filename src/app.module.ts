import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseSection } from './course/course.module';

// Configs objects
import { envConfig } from './configs/env.config';
import { typeOrmConfig } from './configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRoot(typeOrmConfig()),

    CourseSection,
  ],
})
export class AppModule {}
