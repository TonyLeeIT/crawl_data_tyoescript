"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsDetailResolver = void 0;
const type_graphql_1 = require("type-graphql");
const newsDetail_entity_1 = require("../entity/newsDetail.entity");
const newsDetail_service_1 = require("../service/newsDetail.service");
let NewsDetailResolver = class NewsDetailResolver {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, newsDetail_service_1.getAllNewsDtail)();
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [newsDetail_entity_1.NewsDetailEntity])
], NewsDetailResolver.prototype, "getAll", null);
NewsDetailResolver = __decorate([
    (0, type_graphql_1.Resolver)(() => newsDetail_entity_1.NewsDetailEntity)
], NewsDetailResolver);
exports.NewsDetailResolver = NewsDetailResolver;
