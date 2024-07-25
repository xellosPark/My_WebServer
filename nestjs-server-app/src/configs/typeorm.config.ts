import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from '../boards/board.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '8877',
  database: 'board-app',
  //entities: [__dirname + '/../**/*.entity.{js,ts}'],
  entities: [Board],
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
};
