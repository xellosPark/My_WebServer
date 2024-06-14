import { Body, Controller, Get, Post } from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/creact-board.dto';

const log = (message: string) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
};

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService){ }

    @Get('/')
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards();
    }

    // @Post()
    // createBoard(@Body() body) {
    //     log(`Received body: ${JSON.stringify(body)}`);
    // }

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
    // ): { message: string } {  // Return a success message as an object
    //     log(`Received title: ${title}`);
    //     log(`Received description: ${description}`);
        
    //     this.boardsService.createBoard(title, description);
    //     return { message: '성공' };  // Custom success message
    // }

    // Dto 사용시
    @Post()
    createBoard(
        @Body() createBoardDto: CreateBoardDto
    ): Board {  
        return this.boardsService.createBoard(createBoardDto);
    }
    
}

