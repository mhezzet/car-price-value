/* eslint-disable @typescript-eslint/no-var-requires */
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from '../reports/report.entity';
import { ReportsModule } from '../reports/reports.module';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database:
        process.env.NODE_ENV === 'development' ? 'db.sqlite' : 'test.sqlite',
      entities: [User, Report],
      synchronize: true,
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [process.env.COOKIE_SECRET],
        }),
      )
      .forRoutes('*');
  }
}
