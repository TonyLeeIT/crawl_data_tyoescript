import { ConnectionOptions } from "typeorm";
import path from "path";

const isCompiled = path.extname(__filename).includes("js");

export const ORMConfig = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "crawl_data",
  synchronize: true,
  logging:true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 2000,
  entities: [`src/entity/**/*.${isCompiled ? "js" : "ts"}`],
  migrations: [`src/migration/**/*.${isCompiled ? "js" : "ts"}`],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
  },
} as ConnectionOptions;
