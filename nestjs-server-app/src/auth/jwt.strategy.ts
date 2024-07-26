import { Injectable,UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
// NestJS의 종속성 주입 시스템을 통해 이 서비스가 필요한 모든 곳에서 이를 주입할 수 있습니다.
export class JwtStrategy extends PassportStrategy(Strategy) {
  // 이 클래스는 @nestjs/passport 패키지에서 정의된 PassportStrategy 클래스를 확장합니다.
  // passport-jwt Node.js 패키지에서 정의된 JWT 전략을 전달합니다.
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {
    // 두 가지 중요한 옵션을 전달합니다.
    super({
      secretOrKey: 'Secret1234', 
      // JWT 전략이 사용할 비밀 키를 설정합니다.
      // JWT 토큰을 해독하여 페이로드에 접근합니다.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() 
      // 이 전략은 현재 요청의 Authorization 헤더에서 전달된 JWT를 찾기 위해 구성됩니다.
    });
  }

  // 위에서 토큰이 유효한지 체크가 되면 validate 메소드에서 payload에 있는 유저이름이 데이터베이스에서 있는 유저인지 확인 후 있으면 유저 객체를 return값으로 던져줍니다.
  // return 값은 @UseGuards(AuthGuard())를 이용한 모든 요청의 Request Object에 들어갑니다.
  async validate(payload: any): Promise<User> {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('존재하는 username 사용자 없습니다.');
    }
    
    return user;
  }
}