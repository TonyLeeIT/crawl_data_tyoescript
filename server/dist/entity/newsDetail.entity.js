"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsDetailEntity = void 0;
const typeorm_1 = require("typeorm");
const news_entity_1 = require("./news.entity");
const type_graphql_1 = require("type-graphql");
let NewsDetailEntity = class NewsDetailEntity {
    constructor() {
        this.id = 0;
    }
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)()
], NewsDetailEntity.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => news_entity_1.NewsEntity),
    (0, typeorm_1.ManyToOne)((type) => news_entity_1.NewsEntity, (newsEntity) => newsEntity.newsDetailEntities),
    (0, typeorm_1.JoinColumn)({ name: "news_id" })
], NewsDetailEntity.prototype, "newsEntity", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)("text", { name: "content" })
], NewsDetailEntity.prototype, "content", void 0);
NewsDetailEntity = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: "newsDetail" })
], NewsDetailEntity);
exports.NewsDetailEntity = NewsDetailEntity;
