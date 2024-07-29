// import { EntityRepository, Repository } from 'typeorm';
// import { Board } from './board.entity';

// @EntityRepository(Board) 사용시 오류발생
// export class BoardRepository extends Repository<Board> {
//   // 사용자 정의 메소드 추가 가능
// }

// 0.2 버전의 방식은 @EntityRepository 데코레이터를 Repository에 작성해 준 뒤, Service 레이어에서
// Repository를 의존성 주입을 해서 사용했다.
// 하지만 TypeORM이 0.3버전으로 바뀜에 따라 @EntityRepository 데코레이터를 사용할 수 없게 변경되었다.
// 이에 따라 Custom Repository를 사용하기 위해선 직접 데코레이터를 사용해 Service 레이어로 의존성을 주입해야 한다.

//Repository는 데이터베이스와의 상호작용을 추상화하여 데이터 액세스를 관리하는 데 사용되는 디자인 패턴입니다. 

import { User } from 'src/auth/user.entity';
import { Repository, DataSource, EntityRepository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/creact-board.dto';

// 커스텀 리포지토리 클래스
export class BoardRepository extends Repository<Board> {
  constructor(dataSource: DataSource) {
    super(Board, dataSource.manager);
  }

   // 게시판을 생성하는 커스텀 메소드
  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    const { title, description } = createBoardDto;

    // 콘솔 로그 추가: DTO에서 추출한 데이터와 사용자 정보 출력
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('User:', user);

     // 새로운 Board 엔티티 생성
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user: user
    });

    // 생성된 Board 엔티티를 데이터베이스에 저장
    await this.save(board);
    return board;
  }
}
