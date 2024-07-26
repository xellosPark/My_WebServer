import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes,ValidationPipe} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

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
    async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
        return this.authService.signIn(authCredentialsDto);
    }
}
