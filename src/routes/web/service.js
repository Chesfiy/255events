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
router.get("/services", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield server_1.prisma.service.findMany();
        const packages = yield server_1.prisma.package.findMany();
        const parsedPackages = packages.map((pkg) => {
            var _a;
            let parcedItems = {};
            try {
                const fixedStr = (_a = pkg.items) === null || _a === void 0 ? void 0 : _a.replace(/'/g, '"').replace(/(\w+):/g, '"$1":');
                parcedItems = JSON.parse(fixedStr);
            }
            catch (error) {
                console.log('errrro while persing items', error);
            }
            return Object.assign(Object.assign({}, pkg), { items: parcedItems });
        });
        res.render("services", { layout: 'index', services, parsedPackages });
    }
    catch (error) {
    }
}));
router.get("/services/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log("id:", id);
        const service = yield server_1.prisma.service.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                package: true,
            }
        });
        console.log('serrvice', service);
        const packageWithParsedItems = service === null || service === void 0 ? void 0 : service.package.map((pkg) => {
            var _a;
            let parcedItems = {};
            const item = { 'item1': 'Decoration', 'item2': 'DJ Sound', 'item3': 'Photographer', 'item4': 'MC' };
            try {
                const fixedStr = (_a = pkg.items) === null || _a === void 0 ? void 0 : _a.replace(/'/g, '"').replace(/(\w+):/g, '"$1":');
                parcedItems = JSON.parse(fixedStr);
            }
            catch (error) {
                console.log('errrro while persing items', error);
            }
            return Object.assign(Object.assign({}, pkg), { items: parcedItems });
        });
        console.log('packageWithParsedItems', packageWithParsedItems);
        res.render("service-details", { layout: 'index', service: Object.assign(Object.assign({}, service), { packages: packageWithParsedItems }) });
    }
    catch (error) {
    }
}));
exports.default = router;
