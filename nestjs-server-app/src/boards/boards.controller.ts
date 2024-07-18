import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/creact-board.dto';

// const log = (message: string) => {
//   const timestamp = new Date().toISOString();
//   console.log(`[${timestamp}] ${message}`);
// };

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  /** nodejs에서 사용 예제
   * app.post('/',(req,res) => {
   *   console.log(req.body);
   * });
   */

  //  nestjs 사용 예제
  // @Post()
  // createBoard(@Body() body) {
  //     log(`Received body: ${JSON.stringify(body)}`);
  // }

  // 개별로 가져올때
  // @Post()
  // createBoard(
  //     @Body('title') title: string,
  //     @Body('description') description: string
  // ): Board{
  //     console.log('title',title);
  //     console.log('title',description);
  //     return this.boardsService.createBoard(title, description);
  // }

  // interface 사용시
  // @Post()
  // createBoard(
  //     @Body('title') title: string,
  //     @Body('description') description: string
  //): { message: string } {  // Return a success message as an object 클라이언트쪽에 보내고싶은때
  //     log(`Received title: ${title}`);
  //     log(`Received description: ${description}`);

  //     this.boardsService.createBoard(title, description);
  //     return { message: '성공' };  // Custom success message
  // }

  // Dto 사용시
  // CURD -> C 부분 Read
  @Post()
  //Handler-level Pipes
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }

  //localhost:3012?id=test
 
  // CURD -> R 부분 Read
  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }

  // CURD -> D 부분 Delete
  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardsService.delectBoard(id);
  }

  // CURD -> U 부분 Updata
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status') status: BoardStatus,
   ) {
    return this.boardsService.updateBoardStatus(id, status);
  }


}
