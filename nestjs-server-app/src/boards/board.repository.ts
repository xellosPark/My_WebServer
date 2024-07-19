import { Repository } from "typeorm";
import { Board } from "./board.entity";

// extends 상속
export class BoardRepositroy extends Repository<Board> {
    
}