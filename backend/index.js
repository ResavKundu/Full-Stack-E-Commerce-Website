const express=require("express")
const cors=require("cors");
const cookieParser = require('cookie-parser');
require('dotenv').config()
const connectDB=require('./config/db')
const router=require('./routes/index')

const app=express()
// CORS configuration
const corsOptions = {
        origin: 'https://full-stack-e-commerce-website-kbch.vercel.app', // Allow your frontend origin
        methods: ['GET', 'POST', 'OPTIONS'], // Allowed HTTP methods
        allowedHeaders: ['Content-Type'], // Allowed headers
    };
    
    app.use(cors(corsOptions));
    // Handle preflight requests
app.options('*', cors());

app.use(cookieParser())
app.use(express.json())

app.use('/api',router)
const PORT=8000 || process.env.PORT
connectDB().then(()=>{
        app.listen(PORT,()=>{
        console.log(`Sever start at ${PORT}`);
        })
})
