import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // 자동으로 User 엔티티에 대한 저장소 제공
    PassportModule.register({ defaultStrategy: 'jwt' }), // JWT 기본 전략 설정
    JwtModule.register({
      secret: 'Secret1234', // JWT 비밀 키 (프로덕션 환경에서는 환경 변수 사용)
      signOptions: { expiresIn: '1h' }, // 토큰 만료 시간 설정 (1시간)
    }),
  ],
  controllers: [AuthController], // AuthController를 컨트롤러로 등록
  providers: [
    AuthService, // AuthService를 서비스로 등록
    JwtStrategy, // JwtStrategy를 전략으로 등록
  ],
  exports: [JwtStrategy, PassportModule], // JwtStrategy 및 PassportModule을 내보냄
})
export class AuthModule {}