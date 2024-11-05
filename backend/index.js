const express=require("express")
const cors=require("cors");
const cookieParser = require('cookie-parser');
require('dotenv').config()
const connectDB=require('./config/db')
const router=require('./routes/index')

const app=express()
app.use(cors({
        origin :'*' ,
        credentials:true
}))
app.use(cookieParser())
app.use(express.json())

app.use('/api',router)
const PORT=8000 || process.env.PORT
connectDB().then(()=>{
        app.listen(PORT,()=>{
        console.log(`Sever start at ${PORT}`);
        })
})
// process.env.FROENTEND_URL