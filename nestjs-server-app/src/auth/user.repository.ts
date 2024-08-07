import { Repository, DataSource } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { ConflictException, InternalServerErrorException, } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export class UserRepository extends Repository<User> {
    constructor(dataSource: DataSource) {
        // DataSource를 사용하여 UserRepository를 초기화
        super(User, dataSource.manager);
      }

    // INSERT INTO "user"("username", "password") VALUES ($1, $2) RETURNING "id" -- PARAMETERS: ["홍기동","1234"]
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        // 콘솔 로그 추가: 입력된 사용자 이름과 비밀번호 출력
        console.log('Received username:', username);
        console.log('Received password:', password);

        // bcrypt 이용하여 비밀번호 숨기기
        // 솔트
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ username, password: hashedPassword });

        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23505') { // 23505는 중복 키 오류를 나타냄
                throw new ConflictException('이미 존재하는 사용자 이름입니다.'); // ConflictException 발생
            } else {
                throw new InternalServerErrorException(); // 다른 오류 발생 시 InternalServerErrorException 발생
            }
        }
    }
}
