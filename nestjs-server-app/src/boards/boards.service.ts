// import { Injectable, NotFoundException } from '@nestjs/common';
// //import { Board, BoardStatus } from './board.model';
// import { BoardStatus } from './board-status.enum';
// import { v1 as uuid } from 'uuid';
// import { CreateBoardDto } from './dto/creact-board.dto';
// import { BoardRepository } from './board.repository';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Board } from './board.entity';

/********************************************************************
 * * DB없이 사용할경우에
 * 메모리에 올려서 사용하는방법
 */
//@Injectable()
//export class BoardsService {
  // private boards: Board[] = [];

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  // // createBoard(title: string, description: string){
  // //     const board: Board = {
  // //         id: uuid(),
  // //         title: title,
  // //         description: description,
  // //         status: BoardStatus.PUBLIC
  // //     }

  // //     this.boards.push(board);
  // //     return board;
  // // }

  // //DTO 사용시 생성
  // //DTO(Data Transfer Object, 데이터 전송 객체)란
  // //프로세스 간에 데이터를 전달하는 객체를 의미합니다.
  // //말 그대로 데이터를 전송하기 위해 사용하는 객체라서
  // //그 안에 비즈니스 로직 같은 복잡한 코드는 없고 순수하게
  // //전달하고 싶은 데이터만 담겨있습니다.
  // //아래의 그림을 통해 DTO는 주로 클라이언트와 서버가 데이터를
  // //주고받을 때 사용하는 객체임을 알 수 있습니다
  // // interface나 class를 이용해서 정의 될 수 있습니다.
  // // 하지만 클래스를 이용하는것을 NestJs에서는 추천하고 있습니다.

  // //DTO 쓰는 이유는 무엇인가요?
  // // 데이터 유효성을 체크하는데 효율적입니다.
  // // 더 안정적인 코드로 만들어 줍니다. 타입스크립트의 타입으로도 사용됩니다.
  // createBoard(createBoardDto: CreateBoardDto) {
  //   // const title = createBoardDto;
  //   // const description = createBoardDto;
  //   const { title, description } = createBoardDto;

  //   const board: Board = {
  //     id: uuid(),
  //     //title: title,
  //     //description: description,
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };

  //   this.boards.push(board);
  //   return board;
  // }

  // getBoardById(id: string): Board {
  //   //return this.boards.find((board) => board.id === id);

  //   //유효성 검사 추가
  //   const found = this.boards.find((board) => board.id === id);

  //   if(!found){
  //     throw new NotFoundException(`Can't find Board with id ${id}`);
  //   }
  //   return found;
  // }

  // delectBoard(id: string): void {
  //   this.boards = this.boards.filter((board) => board.id !== id);
  // }

  // updateBoardStatus( id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }

/**
 * 여기까지 데이터 방식
*********************************************************************************/
/** 
 *  DB하는 방식
 *  pgadmin DB 사용
 *  port: 5432,
    username: 'postgres',
    password: '8877',
    database: 'board-app',
    구성
 */

//@Injectable()
//export class BoardsService {
  //Inject Repository to Service
   // @InjectRepository
    // 이 데코레이터를 이용해서 이 서비스에서 BoardRepositroy룰 이용한다고 이걸
    // BoardRepository 변수에 넣어줍니다.
//     @Injectable()
//     export class BoardsService {
//       constructor(
//         @InjectRepository(BoardRepository)
//         private readonly boardRepository: BoardRepository,
//       ) {}

//   async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
//     console.log('createBoard() 함수 호출');

//     const { title, description } = createBoardDto;

//     console.log(`createBoard() 함수 호출1 ${title} : ${description}`);
//     const board = this.boardRepository.create({
//       title,
//       description,
//       status: BoardStatus.PUBLIC,
//     });

//     await this.boardRepository.save(board);
//     return board;
//   }


//   async getBoardById(id: number): Promise<Board> {
//     const found = await this.boardRepository.findOne({ where: { id } });

//     if (!found) {
//       throw new NotFoundException(`Can't find Board with id ${id}`);
//     }
//     return found;
//   }
// }

import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from './dto/creact-board.dto';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardsService {
  constructor(
    //@Inject('BOARD_REPOSITORY')
    @InjectRepository(Board)
    private readonly boardRepository: BoardRepository,
  ) {}

  //  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
  //  //console.log('createBoard() 함수 호출');
  //  const { title, description } = createBoardDto;
  //  //console.log(`createBoard() 함수 호출1 ${title} : ${description}`);
  //  const board = this.boardRepository.create({
  //    title,
  //    description,
  //    status: BoardStatus.PUBLIC,
  //  });
  //  await this.boardRepository.save(board);
  //  return board;
  // }

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  } 

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  async delectBoard(id: number): Promise<void>{
    //remove 진행할라면 DB id가 먼저 있는지 검사 해야한다. 없는 경우에 오류 발생
    // const board = await this.boardRepository.findOne({ where: { id } });
    // if (board) {
    //   await this.boardRepository.remove(board);
    // } else {
    //   throw new Error(`Board with ID ${id} not found`);
    // }

    //Delete 만약 아이템이 존재하면 지우고 존재하지 않으면 아무런 영향을 없다.
    const result = await this.boardRepository.delete(id);

    //query: DELETE FROM "board" WHERE "id" IN ($1) -- PARAMETERS: [333]
    //result DeleteResult { raw: [], affected: 0 } // Db에 없는 경우
    //query: DELETE FROM "board" WHERE "id" IN ($1) -- PARAMETERS: [3]
    //result DeleteResult { raw: [], affected: 1 }//Db에 1개 경우
    //affected: DB에서 작업 raw 수

    //DB에 없는 경우에 오류 clinet 에게 오류 메세지 
    if( result.affected === 0 ) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }


    console.log('result',result);
  }

  async updateBoardStatus( id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }

  //find()인자가 없는경우에 전체 찾기
  // query: SELECT "Board"."id" AS "Board_id", "Board"."title" AS "Board_title",
  // "Board"."description" AS "Board_description", "Board"."status" AS "Board_status" FROM "board" "Board"
  async getAllBoards(): Promise <Board[]> {
     return this.boardRepository.find();
  }
}
