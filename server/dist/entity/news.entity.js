"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsEntity = void 0;
const typeorm_1 = require("typeorm");
const newsDetail_entity_1 = require("./newsDetail.entity");
const type_graphql_1 = require("type-graphql");
let NewsEntity = class NewsEntity {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)()
], NewsEntity.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [newsDetail_entity_1.NewsDetailEntity]),
    (0, typeorm_1.OneToMany)((type) => newsDetail_entity_1.NewsDetailEntity, (newsDetailEntity) => newsDetailEntity.newsEntity, { onUpdate: "CASCADE", onDelete: "CASCADE" })
], NewsEntity.prototype, "newsDetailEntities", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)("varchar", { length: 20, name: "categoryName" })
], NewsEntity.prototype, "categoryName", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)("varchar", { length: 50, name: "topic" })
], NewsEntity.prototype, "topic", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)("varchar", {
        length: 200,
        name: "title",
        nullable: false,
        unique: true,
    })
], NewsEntity.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)("varchar", {
        length: 1000,
        name: "description",
        nullable: false,
        unique: true,
    })
], NewsEntity.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)("varchar", { length: 200, name: "link", unique: true })
], NewsEntity.prototype, "link", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)("varchar", { length: 100, name: "day" })
], NewsEntity.prototype, "day", void 0);
NewsEntity = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: "news" })
], NewsEntity);
exports.NewsEntity = NewsEntity;
