import { Repository, DataSource } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

export class UserRepository extends Repository<User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }
    // INSERT INTO "user"("username", "password") VALUES ($1, $2) RETURNING "id" -- PARAMETERS: ["홍기동","1234"]
    async createUser(ahthCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = ahthCredentialsDto;
        // 중복된 username 체크
        // const existingUser = await this.findOne({ where: { username } });
        // if (existingUser) {
        //     throw new NotFoundException('Username already exists');
        // }

        const user = this.create({ username, password });

        try {
            await this.save(user);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}