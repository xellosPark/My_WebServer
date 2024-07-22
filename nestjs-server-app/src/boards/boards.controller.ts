import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// import { Board, BoardStatus } from './board.model';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/creact-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

// const log = (message: string) => {
//   const timestamp = new Date().toISOString();
//   console.log(`[${timestamp}] ${message}`);
// };

// @Controller('boards')
// export class BoardsController {
//   constructor(private boardsService: BoardsService) {}

  /********************************************************************
 * DB없이 사용할경우에
 * 메모리에 올려서 사용하는방법
 */

  // @Get('/')
  // getAllBoard(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }

  // /** nodejs에서 사용 예제
  //  * app.post('/',(req,res) => {
  //  *   console.log(req.body);
  //  * });
  //  */

  // //  nestjs 사용 예제
  // // @Post()
  // // createBoard(@Body() body) {
  // //     log(`Received body: ${JSON.stringify(body)}`);
  // // }

  // // 개별로 가져올때
  // // @Post()
  // // createBoard(
  // //     @Body('title') title: string,
  // //     @Body('description') description: string
  // // ): Board{
  // //     console.log('title',title);
  // //     console.log('title',description);
  // //     return this.boardsService.createBoard(title, description);
  // // }

  // // interface 사용시
  // // @Post()
  // // createBoard(
  // //     @Body('title') title: string,
  // //     @Body('description') description: string
  // //): { message: string } {  // Return a success message as an object 클라이언트쪽에 보내고싶은때
  // //     log(`Received title: ${title}`);
  // //     log(`Received description: ${description}`);

  // //     this.boardsService.createBoard(title, description);
  // //     return { message: '성공' };  // Custom success message
  // // }

  // // Dto 사용시
  // // CURD -> C 부분 Read
  // @Post()
  // //Handler-level Pipes
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }

  // //localhost:3012?id=test

  // // CURD -> R 부분 Read
  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // }

  // // CURD -> D 부분 Delete
  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardsService.delectBoard(id);
  // }

  // // CURD -> U 부분 Updata
  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }

  /**
 * 여기까지 데이터 방식
*********************************************************************************/
// board Mode는 entity 변경
/** 
 *  DB하는 방식
 *  pgadmin DB 사용
 *  port: 5432,
    username: 'postgres',
    password: '8877',
    database: 'board-app',
    구성
 */
  @Controller('boards')
  export class BoardsController {
    constructor(private boardsService: BoardsService) {}

  // Dto 사용시
  // CURD -> C 부분 Creat Dto 이용방법
  @Post()
  // Handler-level Pipes
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto):  Promise <Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  // CURD -> R 부분 Read
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise <Board> {
    return this.boardsService.getBoardById(id);
  }
}
