import { BadGatewayException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform {
  // readonly 읽기만 가능한 값 -> 값 변경 안됨
  readonly StatusOptions = [
    BoardStatus.PRIVATE,
    BoardStatus.PUBLIC
  ]

  //transform(value: any, metadata: ArgumentMetadata) {
  transform(value: any) {
    value = value.toUpperCase(); // 대문자로 변경

    if(!this.isStatusValid(value)) {
      throw new BadGatewayException(`${value}  isn't in the status options`);
    }

    // console.log('value', value);
    // console.log('metadata', metadata);
    return value;
  }
  
  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
