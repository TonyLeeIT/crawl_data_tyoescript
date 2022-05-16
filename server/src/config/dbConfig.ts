import { createConnection } from "typeorm";
import { ORMConfig } from "./ormconfig";
import { log } from "../logger/index";

export const getConnectionDb = async () => {
  try {
    log.info("Connecting to database ................");
    const connection = await createConnection(ORMConfig);
    const isConnected: boolean = connection.isConnected;
    if (isConnected) {
      log.info("Database connection was successful!");
    } else {
      await connection.close();
    }
  } catch (error) {
    log.error("ERROR: Database connection failed!!", error);
    throw error;
  }
};
