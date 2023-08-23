import dotenv from "dotenv";
import express  from "express";
import router from "./app/routes/index.js";

dotenv.config();
let app = express();

app.use(express.json());
app.use("/", router);

let config = JSON.parse(process.env.MY_SERVER);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});