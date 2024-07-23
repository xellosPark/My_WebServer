import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { DataSource } from 'typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'USER_REPOSITORY',
      useFactory: (dataSource: DataSource) => {
        return new UserRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
})

/// 오류 발생
// @Module({
//   imports: [TypeOrmModule.forFeature([User, UserRepository])],
//   controllers: [AuthController],
//   providers: [AuthService],
// })

export class AuthModule {}