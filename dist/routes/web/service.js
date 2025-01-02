import express from "express";
import { prisma } from "./../../server";
const router = express.Router();
router.get("/services", async (req, res) => {
    try {
        const services = await prisma.service.findMany();
        const packages = await prisma.package.findMany();
        const parsedPackages = packages.map((pkg) => {
            let parcedItems = {};
            try {
                const fixedStr = pkg.items?.replace(/'/g, '"').replace(/(\w+):/g, '"$1":');
                parcedItems = JSON.parse(fixedStr);
            }
            catch (error) {
                console.log('errrro while persing items', error);
            }
            return {
                ...pkg,
                items: parcedItems
            };
        });
        res.render("services", { layout: 'index', services, parsedPackages });
    }
    catch (error) {
    }
});
router.get("/services/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id:", id);
        const service = await prisma.service.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                package: true,
            }
        });
        console.log('serrvice', service);
        const packageWithParsedItems = service?.package.map((pkg) => {
            let parcedItems = {};
            const item = { 'item1': 'Decoration', 'item2': 'DJ Sound', 'item3': 'Photographer', 'item4': 'MC' };
            try {
                const fixedStr = pkg.items?.replace(/'/g, '"').replace(/(\w+):/g, '"$1":');
                parcedItems = JSON.parse(fixedStr);
            }
            catch (error) {
                console.log('errrro while persing items', error);
            }
            return {
                ...pkg,
                items: parcedItems
            };
        });
        console.log('packageWithParsedItems', packageWithParsedItems);
        res.render("service-details", { layout: 'index', service: {
                ...service,
                packages: packageWithParsedItems
            } });
    }
    catch (error) {
    }
});
export default router;
