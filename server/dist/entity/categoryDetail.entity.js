"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryDetailEntity = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./category.entity");
const type_graphql_1 = require("type-graphql");
let CategoryDetailEntity = class CategoryDetailEntity {
    constructor() {
        this.id = 0;
    }
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)()
], CategoryDetailEntity.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => category_entity_1.CategoryEntity),
    (0, typeorm_1.ManyToOne)((type) => category_entity_1.CategoryEntity, (categoryEntity) => categoryEntity.categoryDetailEntities),
    (0, typeorm_1.JoinColumn)({ name: "category_id" })
], CategoryDetailEntity.prototype, "categoryEntity", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)("text", { name: "topic" })
], CategoryDetailEntity.prototype, "topic", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)("text", { name: "linkCategoryDetail" })
], CategoryDetailEntity.prototype, "linkCategyDetail", void 0);
CategoryDetailEntity = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: "categoryDetail" })
], CategoryDetailEntity);
exports.CategoryDetailEntity = CategoryDetailEntity;
