/* Load file env */
import dotenv from "dotenv";
dotenv.config();

/* Express */
import express from  "express";
/* Tao ra doi tuong server */
const server=express();
/* Set up cors */
import cors from "cors";
server.use(cors());

/* Setup Body Parser */
import bodyParser from "body-parser"
server.use(bodyParser.json())


import routeApi from "./routes"
import guard from "./middlewares/guard";
/* Chan api */
server.use("/api",guard.ipAuthen, routeApi)




server.listen(process.env.SERVER_PORT, ()=>{
    console.log(`Server on link:http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`);
    
})