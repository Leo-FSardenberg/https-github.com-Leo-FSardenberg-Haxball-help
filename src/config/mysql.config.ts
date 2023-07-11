import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class mysqlConfigService implements TypeOrmOptionsFactory {
    constructor(private ConfigService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: '',
            port: 3306,
            password: '',
            username: '',
            database: '',
            synchronize: false,
            entities: [__dirname + '/../**/*.entity.{js,ts}']   
        }
    }
}
