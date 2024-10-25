import express, { Router } from 'express'
import dotenv from "dotenv"
import bodyParser from 'body-parser'
import path, {dirname,join} from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import { auth } from './auth.js'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname,'../dist')))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
  origin: ['http://localhost:4000','http://localhost:5173'],
  credentials:true
}))
app.use(cookieParser())
app.use('/auth',auth)



app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'../dist','index.html'))
})



app.listen(4009,(req,res)=>{
  console.log('server listening at port 4000')
})
