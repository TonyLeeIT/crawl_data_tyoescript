import express, { Application, Request, Response, NextFunction } from "express";
import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import bodyParser from "body-parser";
import { log } from "./logger/index";
import { getConnectionDb } from "./config/dbConfig";
import { Server } from "typescript-rest";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { NewsDetailResolver } from "./resolvers/newsDetail.resolverr";
import { HelloWorldResolver } from "./resolvers/HelloWorldResolver ";
import { crawlCategory } from "./service/category.service";
import { data } from "./data/data";
import { getAllNews } from "./service/news.service";
import { pagination } from "typeorm-pagination";

const main = async () => {
  await getConnectionDb();
  const app: Application = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(pagination);

  // Just checking if given PORT variable is an integer or not
  let PORT = parseInt(process.env.PORT || "");
  if (isNaN(PORT) || PORT === 0) {
    PORT = 5000;
  }

  const URL: string = process.env.URL || "";

  // if (URL) {
  //   setInterval(() => crawlCategory(URL), 1000 * 60 * 10);
  // }

  // crawlCategory(URL)

  Server.buildServices(app);
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver, NewsDetailResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.get("/qr-code", (req, res) => {
    const qrCode: string =
      "00020101021238570010A00000072701270006970403011300110123456780208QRIBFTTA530370454061800005802VN62340107NPS68690819thanh toan don hang63042E2E";
    res.json(qrCode);
  });

  app.get("/data", async (req, res) => {
    interface Query {
      per_page: number;
      searhKeyWord: string;
    }
    const { per_page, searhKeyWord } = req.query as unknown as Query;
    res.json(await getAllNews(per_page, searhKeyWord));
  });
  app.listen(PORT, () => {
    log.info(
      `server is running with port ${PORT}. GraphQL server started on localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
};

main().catch((error) => log.error(error));
