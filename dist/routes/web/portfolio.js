import express from "express";
import { prisma } from "./../../server";
const router = express.Router();
router.get("/portfolio", async (req, res) => {
    try {
        const portfolios = await prisma.portfolio.findMany();
        res.render("portfolio", { layout: 'index', portfolios });
    }
    catch (error) {
    }
});
router.get("/portfolio/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id:", id);
        const portfolio = await prisma.portfolio.findUnique({
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
});
export default router;
