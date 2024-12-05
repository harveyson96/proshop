import mongoose from 'mongoose'

async function  connectDB(params) {
    try{ 
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connect to DB ${conn.connection.host}`)
    }
    catch(error){
        console.log(`Error ${error.message}`)
        process.exit(1)
    }

}

export default connectDB;