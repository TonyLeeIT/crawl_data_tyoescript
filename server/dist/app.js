"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = require("./logger/index");
const dbConfig_1 = require("./config/dbConfig");
const typescript_rest_1 = require("typescript-rest");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const newsDetail_resolverr_1 = require("./resolvers/newsDetail.resolverr");
const news_resolverr_1 = require("./resolvers/news.resolverr");
const HelloWorldResolver_1 = require("./resolvers/HelloWorldResolver ");
const category_service_1 = require("./service/category.service");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbConfig_1.getConnectionDb)();
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    // Just checking if given PORT variable is an integer or not
    let PORT = parseInt(process.env.PORT || "");
    if (isNaN(PORT) || PORT === 0) {
        PORT = 5000;
    }
    const URL = process.env.URL || "";
    if (URL) {
        (0, category_service_1.crawlCategory)(URL);
    }
    typescript_rest_1.Server.buildServices(app);
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield (0, type_graphql_1.buildSchema)({
            resolvers: [HelloWorldResolver_1.HelloWorldResolver, newsDetail_resolverr_1.NewsDetailResolver, news_resolverr_1.NewsResolver],
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(PORT, () => {
        index_1.log.info(`server is running with port ${PORT}. GraphQL server started on localhost:${PORT}${apolloServer.graphqlPath}`);
    });
});
main().catch((error) => index_1.log.error(error));
