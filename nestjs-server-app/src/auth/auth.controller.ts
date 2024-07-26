import { Body, Controller, Delete, Get, Param, Req, ParseIntPipe, Patch, Post, UsePipes,ValidationPipe, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    //localhost:3012
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signup(authCredentialsDto);
    }

    //http://localhost:3012/auth/signin?username=%ED%99%8D%EA%B8%B8%EB%8F%993&password=1234
    @Post('/signin')
    async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard('jwt')) // 'jwt' 전략을 명시적으로 지정
    test(@Req() req) {
        console.log('req', req.user); // 인증된 사용자의 정보를 출력
    }
}
