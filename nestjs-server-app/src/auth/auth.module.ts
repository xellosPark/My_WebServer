import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { DataSource } from 'typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // Passport 모듈을 JWT 기본 전략으로 설정하여 가져옴
    PassportModule.register({ defaultStrategy: 'jwt' }),
    
    // JWT 모듈을 설정하여 비밀 키와 만료 시간을 설정
    JwtModule.register({
      secret: 'Secret1234', // JWT 토큰을 서명하는 데 사용할 비밀 키
      signOptions: { 
        expiresIn: 60 * 60, // 토큰 만료 시간 (1시간)
      }
    }),

    // TypeORM 모듈에서 User 엔티티를 사용하기 위해 가져옴
    TypeOrmModule.forFeature([User, UserRepository]), // UserRepository를 명시적으로 추가
  ],
  controllers: [AuthController], // AuthController를 컨트롤러로 사용
  providers: [
    AuthService, // AuthService를 서비스로 등록
    JwtStrategy, // JwtStrategy를 전략으로 등록
    {
      provide: 'USER_REPOSITORY',
      useFactory: (dataSource: DataSource) => {
        return new UserRepository(dataSource);
      },
      inject: [DataSource], // DataSource 주입
    },
  ],
  exports: [JwtStrategy, PassportModule], // JwtStrategy 및 PassportModule을 내보냄
})

/// 오류 발생
// @Module({
//   imports: [TypeOrmModule.forFeature([User, UserRepository])],
//   controllers: [AuthController],
//   providers: [AuthService],
// })

export class AuthModule {}