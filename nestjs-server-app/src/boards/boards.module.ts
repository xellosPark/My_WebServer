import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepositroy } from './board.repository';

// 자동 로드 엔터티
// entities데이터 소스 옵션 배열 에 엔터티를 수동으로 추가하는 것은 지루할 수 있습니다.
// 또한 루트 모듈에서 엔터티를 참조하면 애플리케이션 도메인 경계가 깨지고 애플리케이션의 다른 부분에 구현 세부 정보가 누출됩니다.
// 이 문제를 해결하기 위해 대체 솔루션이 제공됩니다. 엔터티를 자동으로 로드하려면 아래에 표시된 대로
// autoLoadEntities 구성 개체( forRoot()메서드에 전달됨)의 속성을 로 설정합니다 true.

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepositroy])
  ],

  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
