import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/creact-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  // createBoard(title: string, description: string){
  //     const board: Board = {
  //         id: uuid(),
  //         title: title,
  //         description: description,
  //         status: BoardStatus.PUBLIC
  //     }

  //     this.boards.push(board);
  //     return board;
  // }

  //DTO 사용시 생성
  //DTO(Data Transfer Object, 데이터 전송 객체)란
  //프로세스 간에 데이터를 전달하는 객체를 의미합니다.
  //말 그대로 데이터를 전송하기 위해 사용하는 객체라서
  //그 안에 비즈니스 로직 같은 복잡한 코드는 없고 순수하게
  //전달하고 싶은 데이터만 담겨있습니다.
  //아래의 그림을 통해 DTO는 주로 클라이언트와 서버가 데이터를
  //주고받을 때 사용하는 객체임을 알 수 있습니다
  // interface나 class를 이용해서 정의 될 수 있습니다.
  // 하지만 클래스를 이용하는것을 NestJs에서는 추천하고 있습니다.

  //DTO 쓰는 이유는 무엇인가요?
  // 데이터 유효성을 체크하는데 효율적입니다.
  // 더 안정적인 코드로 만들어 줍니다. 타입스크립트의 타입으로도 사용됩니다.
  createBoard(createBoardDto: CreateBoardDto) {
    // const title = createBoardDto;
    // const description = createBoardDto;
    const { title, description } = createBoardDto;

    const board: Board = {
      id: uuid(),
      //title: title,
      //description: description,
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    //return this.boards.find((board) => board.id === id);

    //유효성 검사 추가
    const found = this.boards.find((board) => board.id === id);

    if(!found){
      throw new NotFoundException();
    }
    return found;
  }

  delectBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }

  updateBoardStatus( id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
