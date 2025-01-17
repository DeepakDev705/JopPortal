import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute  from "./routes/application.route.js";
import path from "path";

const app = express();

dotenv.config({});

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'https://jopportal-21s3.onrender.com',
    credentials:true
}

app.use(cors(corsOptions));

// app.get("/",(req,res)=>{
//     res.send("Welcome to home page");
// })

const PORT = process.env.PORT || 3000;


const _dirname = path.resolve();


//todo api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname,"/client/dist")));
app.get('*',(_,res) => {
    res.sendFile(path.resolve(_dirname,"client","dist","index.html"))
})

app.listen(PORT,()=>{
    connectDB();
   
})