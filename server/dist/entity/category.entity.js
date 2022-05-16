"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryEntity = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const categoryDetail_entity_1 = require("./categoryDetail.entity");
let CategoryEntity = class CategoryEntity {
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)()
], CategoryEntity.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [categoryDetail_entity_1.CategoryDetailEntity]),
    (0, typeorm_1.OneToMany)((type) => categoryDetail_entity_1.CategoryDetailEntity, (categoryDetailEntity) => categoryDetailEntity.categoryEntity, { onUpdate: "CASCADE", onDelete: "CASCADE" })
], CategoryEntity.prototype, "categoryDetailEntities", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)("varchar", { length: 50, name: "name" })
], CategoryEntity.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)("varchar", { length: 1000, nullable: true })
], CategoryEntity.prototype, "link", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: "timestamptz", default: "now()" })
], CategoryEntity.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: "timestamptz" })
], CategoryEntity.prototype, "updatedAt", void 0);
CategoryEntity = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: "category" })
], CategoryEntity);
exports.CategoryEntity = CategoryEntity;
