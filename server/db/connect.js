import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function connect(){
    const DBURI = process.env.MONGODB_URI
    try{
        await mongoose.connect(DBURI)
        console.log("Database connection - Success !")
    }
    catch(e){
        console.log("Database connection - Error ", e)
    }
}

export default connect