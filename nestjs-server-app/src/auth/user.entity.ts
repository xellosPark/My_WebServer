import { Board } from "src/boards/board.entity";
import { BaseEntity,Entity,PrimaryGeneratedColumn,OneToMany,Column,Unique } from "typeorm";

@Entity()
@Unique(['username'])

export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // Board => Board.user (Board 데이터 가져오기),
    // {eager: true} => true이면 User데이터 가져올때 게시물도 같이 가져오기
    // {eager: false} => false이면 User데이터 가져올때 User정보가만 사용
    @OneToMany(type => Board, Board => Board.user, {eager: true})
    boards: Board[]
}

