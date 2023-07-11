import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlConfigService } from './config/mysql.config';
import { PlayerModule } from './players/player.module';
import { FiltroDeExcecaoHttp } from './filtros/filtro-de-excecao-http';
import {APP_FILTER} from '@nestjs/core'

@Module({
  imports: [
    PlayerModule,
    ConfigModule.forRoot({
    isGlobal: true
  }),
  TypeOrmModule.forRootAsync({
    useClass: mysqlConfigService,
    inject: [mysqlConfigService]
  })
],

providers: [
  {
    provide: APP_FILTER,
    useClass: FiltroDeExcecaoHttp
  }
]
})
export class AppModule {}
