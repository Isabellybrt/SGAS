import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServicesModule } from './modules/services/services.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { User } from './entities/user.entity';
import { ServiceEntity } from './entities/service.entity';
import { Appointment } from './entities/appointment.entity';
import { LoggingMiddleware } from './common/middlewares/logging.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const raw = process.env.DATABASE_URL || '';
        if (raw.startsWith('postgres://')) {
           const u = new URL(raw);
           return {
             type: 'postgres',
             host: u.hostname,
             port: Number(u.port || 5432),
             username: decodeURIComponent(u.username),
             password: decodeURIComponent(u.password),
             database: u.pathname.replace(/^\/+/, ''),
             entities: [User, ServiceEntity, Appointment],
             synchronize: true
           };
        }
        return {
          type: 'postgres',
          url: raw,
          entities: [User, ServiceEntity, Appointment],
          synchronize: true
        };
      }
    }),
    UsersModule,
    AuthModule,
    ServicesModule,
    AppointmentsModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
