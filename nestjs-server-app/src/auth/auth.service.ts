import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';

// TypeORM의 데코레이터인 @InjectRepository()는 일반적인 @Injectable() 데코레이터와 비슷하게 의존성 주입을 위한 데코레이터입니다. 
// 하지만 그 둘의 목적이 조금 다릅니다. @Injectable()은 NestJS에서 만든 클래스를 의존성 주입 가능하게 만드는 데코레이터입니다.
// 반면, @InjectRepository()는 NestJS가 작성한 것이 아닌 외부라이브러리 TypeORM 레포지토리에 의존성을 주입하는 데코레이터입니다.
// 즉, @Injectable() 데코레이터는 NestJS에서 일반적인 클래스에 사용되고, @InjectRepository() 데코레이터는 TypeORM에서 제공하는 
// 레포지토리 클래스를 NestJS에서 사용하기 위해 사용됩니다.

@Injectable()
export class AuthService {
    constructor(

       // [Nest] 56312  - 2024. 07. 23. 오후 2:10:49   ERROR [ExceptionsHandler] this.userRepository.createUser is not a function
       // @InjectRepository(UserRepository) 오류발생
       @Inject('USER_REPOSITORY')
        private readonly userRepository: UserRepository,
    ) {}

    async signup(authCredentialsDto:AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }
}