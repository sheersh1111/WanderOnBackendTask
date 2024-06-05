const express =require("express");
const bodyParser = require("body-parser");
const errorMiddleware =require("./middleware/error");
const cookieParser=require("cookie-parser");
const path = require("path")
const dotenv=require("dotenv");
const app = express();
const cors = require('cors');

dotenv.config({path:"backend/config/config.env"});
app.use(express.json({limit:"50mb"}));
app.use(cookieParser());
app.use(express.urlencoded({limit:"50mb",extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend port
    optionsSuccessStatus: 200 // For legacy browser support
  };
  
  app.use(cors());

const userAndUrlRoutes=require("./routes/routes")
app.use("/api/v1", userAndUrlRoutes);

app.get("/",(req,res)=>{
    res.send("Welcome to Url-Shortener")
})
app.use(errorMiddleware);

module.exports = app




