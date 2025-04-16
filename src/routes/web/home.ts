import fs from 'fs';
import path from 'path';
import express, {Request, Response} from "express"
import nodemailer from "nodemailer"
import {prisma} from "./../../server"

const router = express.Router();
const messageTemplate = fs.readFileSync(path.resolve(__dirname, '../../views/layouts/emailSmsTemplate.html'), 'utf8');

router.get("/", async (req: Request, res: Response) =>{

    try {
        const services = await prisma.service.findMany()

        const testmonials = await prisma.testmonial.findMany()

        res.render("home",{layout: 'index', services, testmonials})
    } catch (error) {
        
    }
    
})


router.get("/about", async (req: Request, res: Response) =>{

    const team = await prisma.team.findMany()
    res.render("about",{layout: 'index', team})
})

router.get("/about-cate", async (req: Request, res: Response) =>{

  const team = await prisma.team.findMany()
  res.render("about_cate",{layout: 'index', team})
})

router.get("/contact", (req: Request, res: Response) =>{

    res.render("contact",{layout: 'index'})
})

router.post("/contact", (req: Request, res: Response) =>{
    const { form_name, form_email, form_subject, form_phone,  form_message} = req.body
  
    sendMail(
      form_name,form_email,form_subject,form_phone, form_message
    ).catch(
    console.error
    )
    
      res.render("contact",{layout: 'index', message:"Message has been sent successful, We will contact you soon."})
  })

const sendMail = async (name: string, email: string, subject: string, phone: string, message: string ) =>{

    const transporter = nodemailer.createTransport({
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
    const info = await transporter.sendMail({
      from: email, // Sender addres
      to: 'kitalyfo@gmail.com', // List of recipients
      subject: subject, // Subject line
      html: filledTemplate, // HTML body
    });
  
    console.log('Message sent: %s', info.messageId);
  
  };


export default router;