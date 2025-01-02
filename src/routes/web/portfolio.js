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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("./../../server");
const router = express_1.default.Router();
router.get("/portfolio", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const portfolios = yield server_1.prisma.portfolio.findMany();
        res.render("portfolio", { layout: 'index', portfolios });
    }
    catch (error) {
    }
}));
router.get("/portfolio/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log("id:", id);
        const portfolio = yield server_1.prisma.portfolio.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                portfolioImage: true,
            }
        });
        res.render("portfolio-details", { layout: 'index', portfolio });
    }
    catch (error) {
    }
}));
exports.default = router;
