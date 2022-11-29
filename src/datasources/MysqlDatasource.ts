import {registerProvider} from "@tsed/di";
import {DataSource} from "typeorm";
import {Logger} from "@tsed/logger";
import { BlogModel } from "src/models/BlogModel";

export const MYSQL_DATA_SOURCE = Symbol.for("MysqlDataSource");
export const MysqlDataSource = new DataSource({
  type: "mysql",
  entities: [BlogModel],
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "blog",
  synchronize: true,
});

registerProvider<DataSource>({
  provide: MYSQL_DATA_SOURCE,
  type: "typeorm:datasource",
  deps: [Logger],
  async useAsyncFactory(logger: Logger) {
    await MysqlDataSource.initialize();

    logger.info("Connected with typeorm to database: Mysql");

    return MysqlDataSource;
  },
  hooks: {
    $onDestroy(dataSource) {
      return dataSource.isInitialized && dataSource.close();
    }
  }
});
