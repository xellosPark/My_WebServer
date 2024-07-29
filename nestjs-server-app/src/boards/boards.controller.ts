import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe,} from '@nestjs/common';
// import { Board, BoardStatus } from './board.model';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/creact-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

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
  @UseGuards(AuthGuard())
  export class BoardsController {
    constructor(private boardsService: BoardsService) {}

  // Dto 사용시
  // CURD -> C 부분 Creat Dto 이용방법
  @Post()
  // Handler-level Pipes
  // ValidationPipe는 Board의 DTO에서 지정한 유효성을 검사하는 역할을 한다.
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto, @GetUser() user:User ):  Promise <Board> {
    
     // createBoardDto와 user의 내용을 
     console.log('createBoardDto:', createBoardDto);
     console.log('user:', user);
    
    return this.boardsService.createBoard(createBoardDto, user);
  }

  // CURD -> R 부분 Read
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise <Board> {
    return this.boardsService.getBoardById(id);
  }

  
  // CURD -> D 부분 Delete
  // @Param('id', ParseIntPipe) 데코레이터를 사용하여 id 파라미터에 ParseIntPipe 파이프를 바인딩합니다.
  // 이렇게 하면 id 파라미터가 정수로 변환되어 라우트 핸들러에 전달됩니다.
  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise <void> {
    return this.boardsService.delectBoard(id);
  }

  // CURD -> U 부분 Updata
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }

  // CURD -> R 부분 Read
  // All Data
  @Get('/')
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }
}
