import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository'; // UserRepository 추가
import { DataSource } from 'typeorm'; // DataSource 가져오기

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([User]), // 자동으로 User 엔티티에 대한 저장소 제공
//     PassportModule.register({ defaultStrategy: 'jwt' }), // JWT 기본 전략 설정
//     JwtModule.register({
//       secret: 'Secret1234', // JWT 비밀 키 (프로덕션 환경에서는 환경 변수 사용)
//       signOptions: { expiresIn: '1h' }, // 토큰 만료 시간 설정 (1시간)
//     }),
//   ],
//   controllers: [AuthController], // AuthController를 컨트롤러로 등록
//   providers: [
//     AuthService, // AuthService를 서비스로 등록
//     JwtStrategy, // JwtStrategy를 전략으로 등록
//   ],
//   exports: [JwtStrategy, PassportModule], // JwtStrategy 및 PassportModule을 내보냄
// })
// export class AuthModule {}

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // User 엔티티와 연결된 리포지토리 등록
    PassportModule.register({ defaultStrategy: 'jwt' }), // JWT 기본 전략 설정
    JwtModule.register({
      secret: 'Secret1234', // JWT 비밀 키 설정 (프로덕션 환경에서는 환경 변수를 사용해야 함)
      signOptions: { expiresIn: '1h' }, // 토큰 만료 시간 설정 (1시간)
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: 'UserRepository', // UserRepository 제공
      useFactory: (dataSource: DataSource) => new UserRepository(dataSource), // UserRepository 인스턴스 생성
      inject: [DataSource], // DataSource 주입
    },
  ],
  exports: [JwtStrategy, PassportModule], // JwtStrategy 및 PassportModule 내보냄
})
export class AuthModule {}