import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: '',
    port: 3306,
    password: '',
    username: '',
    database: '',
    synchronize: false,
    entities: [__dirname + '/../**/*.entity.{js,ts}']
}

const datasource = new DataSource(dataSourceOptions)

export default datasource
