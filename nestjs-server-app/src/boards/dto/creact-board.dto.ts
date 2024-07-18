import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {
  
  //title: string;
  //description: string;
  
  // 파이프 유효검사 Add
  @IsNotEmpty() // title 값이 없는경우에 error 처리
  title: string;

  @IsNotEmpty() // description 값이 없는경우에 error 처리
  description: string;
}
