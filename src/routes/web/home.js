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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const server_1 = require("./../../server");
const router = express_1.default.Router();
const messageTemplate = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../../views/layouts/emailSmsTemplate.html'), 'utf8');
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield server_1.prisma.service.findMany();
        const testmonials = yield server_1.prisma.testmonial.findMany();
        res.render("home", { layout: 'index', services, testmonials });
    }
    catch (error) {
    }
}));
router.get("/about", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield server_1.prisma.team.findMany();
    res.render("about", { layout: 'index', team });
}));
router.get("/contact", (req, res) => {
    res.render("contact", { layout: 'index' });
});
router.post("/contact", (req, res) => {
    const { form_name, form_email, form_subject, form_phone, form_message } = req.body;
    sendMail(form_name, form_email, form_subject, form_phone, form_message).catch(console.error);
    res.render("contact", { layout: 'index', message: "Message has been sent successful, We will contact you soon." });
});
const sendMail = (name, email, subject, phone, message) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com', // Replace with your SMTP server
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS, // Your email password
        },
    });
    // Replace placeholders in the email template with actual values
    const filledTemplate = messageTemplate
        .replace('{{name}}', name)
        .replace('{{email}}', email)
        .replace('{{mail}}', email)
        .replace('{{phone}}', phone)
        .replace('{{message}}', message);
    // Send mail with defined transport object
    const info = yield transporter.sendMail({
        from: email, // Sender addres
        to: 'kitalyfo@gmail.com', // List of recipients
        subject: subject, // Subject line
        html: filledTemplate, // HTML body
    });
    console.log('Message sent: %s', info.messageId);
});
exports.default = router;
