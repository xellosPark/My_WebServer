// import { EntityRepository, Repository } from 'typeorm';
// import { Board } from './board.entity';

// @EntityRepository(Board)
// export class BoardRepository extends Repository<Board> {
//   // 사용자 정의 메소드 추가 가능
// }

import { Repository, DataSource } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/creact-board.dto';

export class BoardRepository extends Repository<Board> {
  constructor(dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.save(board);
    return board;
  }

}
