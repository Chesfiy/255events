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
exports.dirName = exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const express_handlebars_1 = require("express-handlebars");
const path_1 = __importDefault(require("path"));
const handlebaHelpers = require("../helpers/hbshelper");
const home_1 = __importDefault(require("./routes/web/home"));
const service_1 = __importDefault(require("./routes/web/service"));
const portfolio_1 = __importDefault(require("./routes/web/portfolio"));
exports.prisma = new client_1.PrismaClient();
exports.dirName = __dirname;
const app = (0, express_1.default)();
const port = 3000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded());
        app.set('view engine', 'hbs');
        app.engine('hbs', (0, express_handlebars_1.engine)({
            layoutsDir: __dirname + '/views/layouts',
            partialsDir: __dirname + '/views/partials/',
            extname: 'hbs',
            helpers: handlebaHelpers
        }));
        app.set('views', path_1.default.join(__dirname, '/views'));
        app.use(express_1.default.static(__dirname + '/public'));
        app.use("/", [home_1.default, service_1.default, portfolio_1.default]);
        // app.get('/',(req: Request, res: Response) => {
        //     console.log('/ home route is called')
        //     res.send("Hello world");
        // })
        // Catch unregistered routes
        app.all("*", (req, res) => {
            res.render("404", { layout: '404' });
        });
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("connectiong to prisma......");
    yield exports.prisma.$connect();
    console.log("prisma connected......");
})).catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield exports.prisma.$disconnect();
    process.exit(1);
}));
