"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORMConfig = void 0;
const path_1 = __importDefault(require("path"));
const isCompiled = path_1.default.extname(__filename).includes("js");
exports.ORMConfig = {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "crawl_data",
    synchronize: true,
    logging: ["error"],
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 2000,
    entities: [`src/entity/**/*.${isCompiled ? "js" : "ts"}`],
    migrations: [`src/migration/**/*.${isCompiled ? "js" : "ts"}`],
    cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
    },
};
