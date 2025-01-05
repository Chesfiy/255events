
import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"
import hbs, { engine, create } from "express-handlebars";
import path from 'path'
import handlebaHelpers from "./helpers/hbshelper";

import HomeRouter from "./routes/web/home"
import ServiceRoute from "./routes/web/service"
import PortfolioRoute from "./routes/web/portfolio"

export const prisma = new PrismaClient();
export const dirName = __dirname; 
const app = express();
const port = 3000;

async function main(){
   
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.set('view engine', 'hbs');
    app.engine('hbs', engine({
        layoutsDir: __dirname+'/views/layouts',
        partialsDir: __dirname + '/views/partials/',
        extname: 'hbs',
        helpers: handlebaHelpers
    }))
    
    
    app.set('views', path.join(__dirname, '/views'));
    app.use(express.static(__dirname+'/public'));

    app.use("/", [HomeRouter,ServiceRoute, PortfolioRoute]);

    // app.get('/',(req: Request, res: Response) => {
    //     console.log('/ home route is called')
    //     res.send("Hello world");
    // })

    // Catch unregistered routes
    app.all("*", (req: Request, res: Response) => {
        res.render("404",{layout: '404'})
    });

    app.use((err: Error, req: Request, res: Response, next: Function) => {
        console.error(err.stack);
        res.status(500).send("Something broke!");
    });

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      });
}

console.log("Starting the server...");
main()
.then(async () => {
    console.log("connectiong to prisma......")
    await prisma.$connect();

    console.log("prisma connected......")
}).catch(async (e) =>{
    console.error( e)
    await prisma.$disconnect();
    process.exit(1)
})