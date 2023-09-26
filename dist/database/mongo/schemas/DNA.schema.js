"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DNASequenceSchema = exports.DNASequenceMongo = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let DNASequenceMongo = class DNASequenceMongo {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], DNASequenceMongo.prototype, "dna", void 0);
DNASequenceMongo = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false })
], DNASequenceMongo);
exports.DNASequenceMongo = DNASequenceMongo;
exports.DNASequenceSchema = mongoose_1.SchemaFactory.createForClass(DNASequenceMongo);
//# sourceMappingURL=DNA.schema.js.map