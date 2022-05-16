"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectionDb = void 0;
const typeorm_1 = require("typeorm");
const ormconfig_1 = require("./ormconfig");
const index_1 = require("../logger/index");
const getConnectionDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        index_1.log.info("Connecting to database ................");
        const connection = yield (0, typeorm_1.createConnection)(ormconfig_1.ORMConfig);
        const isConnected = connection.isConnected;
        if (isConnected) {
            index_1.log.info("Database connection was successful!");
        }
        else {
            yield connection.close();
        }
    }
    catch (error) {
        index_1.log.error("ERROR: Database connection failed!!", error);
        throw error;
    }
});
exports.getConnectionDb = getConnectionDb;
