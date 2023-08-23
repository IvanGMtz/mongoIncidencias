import {MongoClient} from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export async function con(){
    try{
        const uri= `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.jzmvywo.mongodb.net/${process.env.ATLAS_DB}`
        const options ={
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        const client = await MongoClient.connect(uri, options);
        return client.db();
    }catch(error){
        return { status:500, message: error}
    }
}