const express=require('express')
const router=express.Router()
const app=express()
const axios=require('axios')
const cors=require('cors')
require('dotenv').config()
app.use(cors())
app.use(router)
router.get('/generateToken',getToken)
router.get('/getProducts',getProducts)

async function getToken(req,res,next) {
    try{
    const response=await axios.post(process.env.GET_TOKEN,{},{headers:{'Api-key': process.env.API_KEY}})
    const data=await response.data
      res.send(data)
    }catch(error){
      res.send(error)
    }
}

async function getProducts(req,res,next) {
    try {
    const response=await axios.post(process.env.GET_PRODUCTS,{session_id:process.env.SESSION_ID},{headers:{'Api-key':process.env.API_KEY,'Auth-token':req.header('Auth-token')}})
    const data=await response.data
        res.send(data)  
    } catch (error) {
        res.send(error)
    }
}

app.listen(process.env.PORT)
